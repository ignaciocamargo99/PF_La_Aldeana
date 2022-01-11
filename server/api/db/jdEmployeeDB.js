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

module.exports = { jdEmployeeGetDB }