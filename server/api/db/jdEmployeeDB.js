const pool = require('../../config/connection');

const jdEmployeeGetDB = (params) => {
    let yearMonth = params.yearMonth
    const sqlSelect = `SELECT date,employee_dni,ct.abbreviation FROM JD_EMPLOYEES jde 
                        INNER JOIN COMPOUND_TURNS ct ON jde.id_compound_turn = ct.id
                        WHERE DATE LIKE '${yearMonth}%'`;

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

const jdEmployeeInDateGetDB = (params) => {
    let date = params.date
    const sqlSelect = `SELECT date FROM JD_EMPLOYEES jde
                        WHERE Date LIKE '${date}' `;

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

const jdEmployeeCreateDB = (newJDEmployee) => {
    const sqlInsert = 'INSERT INTO JD_EMPLOYEES VALUES(?,?,?)';
    const {date, employee_dni, id_compound_turn} = newJDEmployee;

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlInsert, [date,employee_dni,id_compound_turn], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            db.release();
        })
    });
};

const jdEmployeeUpdateDB = (updateJDEmployee) => {
    const {date, employee_dni, id_compound_turn} = updateJDEmployee
    const sqlUpdate = `UPDATE JD_EMPLOYEES SET id_compound_turn = ? WHERE date = ? AND employee_dni = ?`;


    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);
            db.query(sqlUpdate,[id_compound_turn,date,employee_dni], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            db.release();
        })
    });
};

const jdEmployeeDeleteDB = (jdToDelete) => {
    const {date, employee_dni } = jdToDelete
    const sqlDelete = `DELETE FROM JD_EMPLOYEES WHERE date = ? AND employee_dni = ?`;


    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);
            db.query(sqlDelete,[date,employee_dni], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            db.release();
        })
    });
};

const scheduleDeleteDB = (dates) => {
    const {dateInit, dateFinish } = dates
    const sqlDelete = `DELETE FROM JD_EMPLOYEES WHERE date BETWEEN ? AND ?`;


    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);
            db.query(sqlDelete,[dateInit,dateFinish], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            db.release();
        })
    });
};


module.exports = { jdEmployeeGetDB, jdEmployeeCreateDB, jdEmployeeUpdateDB, jdEmployeeDeleteDB, jdEmployeeInDateGetDB, scheduleDeleteDB}