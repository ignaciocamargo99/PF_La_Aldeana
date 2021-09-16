
const pool = require('../../config/connection');

const employeeGetDB = () => {
    const sqlSelect = `SELECT dni, name, last_name, date_admission ,charge
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

const employeeDeleteDB = (deleteEmployee) => {
    const sqlUpdate = 'UPDATE EMPLOYEES SET active = 0 WHERE dni = ?';
    let dni;
    if (deleteEmployee) dni = deleteEmployee.dni
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
    let {dni, nameEmployee, lastName, id_charge, date, employmentRelationship} = newEmployee;
    if (dni && nameEmployee && lastName && id_charge && date && employmentRelationship) {
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

module.exports = { employeeGetDB, employeeDeleteDB, chargeGetDB, employeeCreateDB };