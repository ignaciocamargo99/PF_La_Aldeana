const pool = require('../../config/connection');

const jdEmployeeGetDB = (params) => {
    let yearMonth = params.yearMonth
    const sqlSelect = `SELECT date,employee_dni,ct.abbreviation FROM DJ_EMPLOYEE dje 
                        INNER JOIN COMPOUND_TURNS ct ON dje.id_compound_turn = ct.id_compound_turn
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

const jdEmployeeCreateDB = (newJDEmployee) => {
    const sqlInsert = 'INSERT INTO DJ_EMPLOYEE VALUES(?,?,?)';
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
    const sqlUpdate = `UPDATE DJ_EMPLOYEE SET id_compound_turn = ? WHERE date = ? AND employee_dni = ?`;


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

module.exports = { jdEmployeeGetDB, jdEmployeeCreateDB, jdEmployeeUpdateDB}