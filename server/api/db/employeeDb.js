
const pool = require('../../config/connection');

const employeeGetDB = () => {
    const sqlSelect = `SELECT * FROM EMPLOYEES WHERE active = 1`;

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
    const sqlSelect = 'UPDATE EMPLOYEES SET active = 0 WHERE dni = ?';
    let dni;
    if (deleteEmployee) dni = deleteEmployee.dni
    else throw Error('El dni es null');

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlSelect, [dni], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            db.release();
        })
    });
};

module.exports = { employeeGetDB, employeeDeleteDB };