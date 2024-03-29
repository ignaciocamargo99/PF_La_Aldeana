const pool = require('../../config/connection');

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
        });
    });
};

const employeeForDesktopGetDB = () => {
    const sqlSelect = `SELECT e.dni AS DNI, e.name AS NOMBRE, e.last_name AS APELLIDO, 
                        (SELECT COUNT(fp.dniEmployee) FROM FINGER_PRINTS fp WHERE e.dni = fp.dniEmployee) AS "HUELLAS"
                    FROM EMPLOYEES e
                    WHERE e.active = 1`;

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlSelect, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            db.release();
        });
    });
};

// #region Employees ABMC

const employeeGetDB = (dni) => {
    let sqlSelect = `
        SELECT
            e.dni,
            e.name,
            e.last_name,
            e.nickname,
            e.date_admission,
            c.id_charge as chargeId,
            c.name AS chargeName,
            e.employment_relationship,
            er.name AS name_emp_relationship,
            e.number,
            e.street,
            e.neighborhood,
            e.birthday,
            e.cuil,
            e.nickname,
            e.city,
            e.phone
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
    }

    sqlSelect += ' ORDER BY e.date_admission DESC';

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlSelect, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });

            db.release();
        });
    });
};

const employeeGetDateDB = (date) => {
    let sqlSelect = `
        SELECT
            e.dni,
            e.name,
            e.last_name,
            e.date_admission,
            c.id_charge as chargeId,
            c.name AS chargeName,
            e.employment_relationship,
            er.name AS name_emp_relationship,
            e.number,
            e.street,
            e.neighborhood,
            e.birthday,
            e.cuil,
            e.nickname,
            e.city,
            e.phone
        FROM
            EMPLOYEES e
            JOIN EMPLOYMENT_RELATIONSHIP er ON e.employment_relationship = er.id_employee_relationship
            JOIN CHARGES_X_EMPLOYEES cxe ON cxe.dni_employee = e.dni
            JOIN CHARGES c ON cxe.id_charge = c.id_charge
        WHERE
            e.date_admission <= ? AND
            e.active = 1
        ORDER BY e.date_admission DESC
    `;

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);
            
            db.query(sqlSelect,[date] ,(error, result) => {
                console.log(date)
                if (error) reject(error);
                else resolve(result);
            });

            db.release();
        });
    });
};


const employeeCreateDB = (newEmployee) => {
    const sqlSelect = `SELECT dni AS DNI, name AS NOMBRE, last_name AS APELLIDO
                    FROM EMPLOYEES WHERE active = 1`;
    if (!(isEmployeeDataValid(newEmployee))) {
        throw Error('Faltan datos obligatorios');
    }

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);
            db.query(sqlSelect, (error, result) => {
                if (error) reject(error);
                else {
                    if (result.length > 0) result.map(employee => { if (employee.dni === newEmployee.dni) reject('El dni ingresado ya se encuentra en uso') });
                    db.query('INSERT INTO EMPLOYEES VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [
                        newEmployee.dni,
                        newEmployee.name,
                        newEmployee.last_name,
                        newEmployee.date,
                        newEmployee.employment_relationship,
                        1,
                        newEmployee.nickname,
                        newEmployee.cuil,
                        newEmployee.birthday,
                        newEmployee.phone,
                        newEmployee.street,
                        newEmployee.number,
                        newEmployee.neighborhood,
                        newEmployee.city
                    ], (error) => {
                        if (error) reject(error);
                    });

                    newEmployee.charges.forEach(({ chargeId }) => {
                        db.query(
                            'INSERT INTO CHARGES_X_EMPLOYEES VALUES(?,?)',
                            [newEmployee.dni, chargeId],
                            (error, result) => {
                                if (error) reject(error);
                                else resolve(result);
                            }
                        );
                    });

                    db.release();
                }
            });
        });
    });
};

const employeeDeleteDB = (dniEmployee) => {
    if (!dniEmployee) {
        throw Error('El dni es null');
    }

    const sqlUpdate = 'UPDATE EMPLOYEES SET active = 0 WHERE dni = ? ';

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlUpdate, [dniEmployee], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });

            db.release();
        });
    });
};

const employeeUpdateDB = (currentDniEmployee, updateEmployee) => {
    if (!isEmployeeDataValid(updateEmployee)) {
        throw Error('Faltan datos obligatorios');
    }

    const sqlDeleteCurrentChargesOfemployee = `DELETE FROM CHARGES_X_EMPLOYEES
        WHERE dni_employee = ${currentDniEmployee}`;
    const sqlInsertChargesOfemployee =
        'INSERT INTO CHARGES_X_EMPLOYEES(dni_employee, id_charge) VALUES(?,?)';

    let sqlUpdateEmployee =
        `UPDATE EMPLOYEES SET name = ?, last_name = ?, date_admission = ?, 
        employment_relationship = ?,
        cuil = ?,
        birthday = ?,
        phone = ?,
        street = ?,
        number = ?,
        city = ?`;
    if (updateEmployee.nickname || updateEmployee.nickname === '') sqlUpdateEmployee += ', nickname = ?';
    if (updateEmployee.neighborhood || updateEmployee.neighborhood === '') sqlUpdateEmployee += ', neighborhood = ?';
    sqlUpdateEmployee += ` WHERE dni = ${currentDniEmployee}`;

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlDeleteCurrentChargesOfemployee, (error, result) => {
                if (error) {
                    console.log(error, sqlDeleteCurrentChargesOfemployee);
                    reject(error);
                }
            });

            updateEmployee.charges.forEach(({ chargeId }) => {
                db.query(sqlInsertChargesOfemployee, [currentDniEmployee, chargeId], (error) => {
                    if (error) {
                        console.log(error, sqlInsertChargesOfemployee);
                        reject(error);
                    }
                });
            });

            let updateEmpData = [
                updateEmployee.name,
                updateEmployee.last_name,
                updateEmployee.date,
                updateEmployee.employment_relationship,
                updateEmployee.cuil,
                updateEmployee.birthday,
                updateEmployee.phone,
                updateEmployee.street,
                updateEmployee.number,
                updateEmployee.city
            ];
            if (updateEmployee.nickname || updateEmployee.nickname === '') updateEmpData.push(updateEmployee.nickname);
            if (updateEmployee.neighborhood || updateEmployee.neighborhood === '') updateEmpData.push(updateEmployee.neighborhood);

            db.query(sqlUpdateEmployee, updateEmpData, (error, result) => {
                if (error) {
                    console.log(error, sqlUpdateEmployee);
                    reject(error);
                }
                else resolve(result);
            });

            db.release();
        });
    });
};

const isEmployeeDataValid = (empDataToValidate) => {
    return (
        empDataToValidate.charges.length > 0 &&
        empDataToValidate.date &&
        empDataToValidate.dni &&
        empDataToValidate.dni.toString().length === 8 &&
        empDataToValidate.employment_relationship &&
        empDataToValidate.last_name &&
        empDataToValidate.name
    );
};

// #endregion

module.exports = {
    employeeGetDB,
    employeeDeleteDB,
    chargeGetDB,
    employeeCreateDB,
    employeeUpdateDB,
    employeeForDesktopGetDB,
    employeeGetDateDB
};
