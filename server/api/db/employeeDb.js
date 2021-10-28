const pool = require('../../config/connection');

const employeeGetDB = () => {
    const sqlSelect = `SELECT dni, name, last_name, date_admission ,charge, employment_relationship
                    FROM EMPLOYEES WHERE active = 1 ORDER BY last_name`;

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
    const sqlInsert = 'INSERT INTO EMPLOYEES VALUES(?,?,?,?,?,?,?)';
    let { dni, nameEmployee, lastName, id_charge, date, employmentRelationship } = newEmployee;
    if (dni && nameEmployee && lastName && id_charge && date && employmentRelationship && dni.length === 8) {
        dni = newEmployee.dni;
        nameEmployee = newEmployee.nameEmployee;
        lastName = newEmployee.lastName;
        id_charge = newEmployee.id_charge;
        date = newEmployee.date;
        employmentRelationship = newEmployee.employmentRelationship;
    }
    else throw Error('Faltan datos obligatorios');

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlInsert, [dni, nameEmployee, lastName, date, employmentRelationship, id_charge, 1], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            db.release();
        })
    });
};


const employeeUpdateDB = (dniEmployee, updateEmployee) => {
    const sqlUpdate = `UPDATE EMPLOYEES SET dni = ?, name = ?, last_name = ?, date_admission = ?, 
                        employment_relationship = ?, charge = ?
                        WHERE dni = ?`;

    let { dni, nameEmployee, lastName, id_charge, date, employmentRelationship, previousDni } = updateEmployee;
    if (dni && nameEmployee && lastName && id_charge && date && employmentRelationship && dni.length === 8) {
        dni = updateEmployee.dni;
        nameEmployee = updateEmployee.nameEmployee;
        lastName = updateEmployee.lastName;
        id_charge = updateEmployee.id_charge;
        date = updateEmployee.date;
        employmentRelationship = updateEmployee.employmentRelationship;
    }
    else throw Error('Faltan datos obligatorios');

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);
            db.query(sqlUpdate, [dni, nameEmployee, lastName, date, employmentRelationship, id_charge, dniEmployee], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            db.release();
        })
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
    let hourNow = new Date().getHours();
    let yearNow, monthNow, dayNow, currentDay;

    if (hourNow >= 21 && hourNow <= 23) {
        yearNow = new Date().getFullYear();
        monthNow = new Date().getMonth() + 1;
        dayNow = new Date().getDate() + 1;
        currentDay = dayNow;
    }
    else {
        yearNow = new Date().getFullYear();
        monthNow = new Date().getMonth() + 1;
        dayNow = new Date().getDate();
        currentDay = dayNow;
    }

    if (hourNow >= 21 && hourNow <= 23) currentDay = dayNow - 1;

    let dateFormattedNow = yearNow + '-' + monthNow + '-' + currentDay;

    const sqlSelect = `
            SELECT ae.*, e.name, e.last_name
            FROM ASSISTANCE_EMPLOYEES ae
            JOIN EMPLOYEES e ON ae.employee = e.dni
            WHERE (CAST(ae.date_entry as DATE) = ?)
            UNION
            SELECT ae.*, e.name, e.last_name
            FROM ASSISTANCE_EMPLOYEES ae
            JOIN EMPLOYEES e ON ae.employee = e.dni
            WHERE (CAST(ae.date_entry AS DATE) = CURDATE())`;

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