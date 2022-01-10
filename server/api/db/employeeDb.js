const pool = require('../../config/connection');

const employeeGetDB = (dni) => {
    let sqlSelect = `
        SELECT
            e.dni,
            e.name,
            e.last_name,
            e.date_admission,
            c.name AS charge,
            e.employment_relationship,
            er.name AS name_emp_relationship
        FROM
            EMPLOYEES e
            JOIN EMPLOYMENT_RELATIONSHIP er ON e.employment_relationship = er.id_employee_relationship
            JOIN CHARGES_X_EMPLOYEES cxe ON cxe.dni_employee = e.dni
            JOIN CHARGES c ON cxe.id_charge = c.id_charge
        WHERE
            active = 1
    `;

    if (dni) {
        sqlSelect += ` AND e.dni = ${dni}`;
    };

    sqlSelect += ' ORDER BY last_name';

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlSelect, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            db.release();
        })
    });
};


const chargeGetDB = () => {
    const sqlSelect = `SELECT id_charge, name from CHARGES`;

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlSelect, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            db.release();
        })
    });
};


const employeeDeleteDB = (dniEmployee) => {
    const sqlUpdate = 'UPDATE EMPLOYEES SET active = 0 WHERE dni = ?';
    let dni;
    if (dniEmployee) dni = dniEmployee
    else throw Error('El dni es null');

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlUpdate, [dni], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            db.release();
        })
    });
};


const employeeCreateDB = (newEmployee) => {
    if (!(isEmployeeDataValid(newEmployee))) {
        throw Error('Faltan datos obligatorios');
    };

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query('INSERT INTO EMPLOYEES VALUES(?,?,?,?,?,?)', [
                newEmployee.dni,
                newEmployee.nameEmployee,
                newEmployee.lastName,
                newEmployee.date_admission,
                newEmployee.employmentRelationshipId,
                1
            ], (error) => {
                if (error) reject(error);
            });

            newEmployee.chargesIds.forEach(chargeId => {
                db.query('INSERT INTO CHARGES_X_EMPLOYEES VALUES(?,?)', [newEmployee.dni, chargeId], (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                });
            });

            db.release();
        })
    });
};


const isEmployeeDataValid = (empDataToValidate) => {
    return (
        empDataToValidate.dni &&
        empDataToValidate.nameEmployee &&
        empDataToValidate.lastName &&
        empDataToValidate.chargesIds.length > 0 &&
        empDataToValidate.date_admission &&
        empDataToValidate.employmentRelationshipId &&
        empDataToValidate.dni.toString().length === 8
    );
};


const employeeUpdateDB = (currentDniEmployee, updateEmployee) => {
    if (!(isEmployeeDataValid(updateEmployee))) {
        throw Error('Faltan datos obligatorios');
    };

    const sqlDeleteCurrentChargesOfemployee =
        `DELETE FROM CHARGES_X_EMPLOYEES
        WHERE dni_employee = ${currentDniEmployee}`
        ;

    const sqlInsertChargesOfemployee = 'INSERT INTO CHARGES_X_EMPLOYEES(dni_employee, id_charge) VALUES(?,?)';

    const sqlUpdateEmployee =
        `UPDATE EMPLOYEES SET dni = ?, name = ?, last_name = ?, date_admission = ?, 
        employment_relationship = ?
        WHERE dni = ${currentDniEmployee}`
        ;

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlDeleteCurrentChargesOfemployee, (error, result) => {
                if (error) reject(error);
            });

            updateEmployee.chargesIds.forEach(chargeId => {
                db.query(sqlInsertChargesOfemployee, [currentDniEmployee, chargeId], (error) => {
                    if (error) reject(error);
                });
            });

            const updateEmpData = [
                updateEmployee.dni,
                updateEmployee.nameEmployee,
                updateEmployee.lastName,
                updateEmployee.date_admission,
                updateEmployee.employmentRelationshipId
            ];

            db.query(sqlUpdateEmployee, updateEmpData, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });

            db.release();
        });
    });
};


const assistanceEmployeeCreateDB = (newAssistance) => {
    const sqlInsert = 'INSERT INTO ASSISTANCE_EMPLOYEES VALUES(?,?,?,?)';

    if (!newAssistance.date_entry || !newAssistance.employee) throw Error('Faltan datos obligatorios');

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);
            db.query(sqlInsert, [null, newAssistance.date_entry, newAssistance.date_egress, newAssistance.employee], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            db.release();
        })
    });
};


const employeeAssistanceGetDB = () => {
    let yearNow = new Date().getFullYear();
    let monthNow = new Date().getMonth() + 1;
    let hourNow = new Date().getHours();
    let dayNow = new Date().getDate();
    let currentDay = dayNow;

    if (hourNow >= 21 && hourNow <= 23) currentDay = dayNow - 1;

    let dateFormattedNow = yearNow + '-' + monthNow + '-' + currentDay;

    const sqlSelect = `
            SELECT ae.*, e.name, e.last_name
            FROM ASSISTANCE_EMPLOYEES ae
            JOIN EMPLOYEES e ON ae.employee = e.dni`;

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlSelect, [dateFormattedNow], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            db.release();
        })
    });
};


const assistanceDeleteDB = (dniEmployee, date_entry) => {
    const sqlDelete = 'DELETE FROM ASSISTANCE_EMPLOYEES WHERE employee = ? AND date_entry = ?';
    let dni, date;
    if (dniEmployee && date_entry) {
        dni = dniEmployee
        date = date_entry
    }
    else throw Error('El dni o la fecha es null');

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlDelete, [dni, date], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            db.release();
        })
    });
};


const employeeAssistanceUpdateDB = (dniEmployee, updateAssistanceEmployee) => {
    const sqlUpdate = `UPDATE ASSISTANCE_EMPLOYEES SET date_entry = ?, date_egress = ?
                        WHERE employee = ? AND date_entry = ?`;

    let { date_entry, date_egress, dni, lastDateEntry } = updateAssistanceEmployee;

    if (!date_entry && !dniEmployee) {
        throw Error('Faltan datos obligatorios');
    }

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);
            db.query(sqlUpdate, [date_entry, date_egress, dni, lastDateEntry], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            db.release();
        })
    });
};

module.exports = {
    employeeGetDB, employeeDeleteDB, chargeGetDB, employeeCreateDB,
    employeeUpdateDB, assistanceEmployeeCreateDB,
    employeeAssistanceGetDB, assistanceDeleteDB, employeeAssistanceUpdateDB
};