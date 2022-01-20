const pool = require('../../config/connection');

const salariesGetDB = (monthYear) => {
    const sqlSelect = "SELECT s.id_salary, s.dni_employee, e.name, e.last_name, s.month_year, s.id_state, ss.name AS state, s.salary_hs , s.subtotal, s.total FROM SALARIES s" +
                "LEFT JOIN EMPLOYEES e ON s.dni_employee = e.dni" +
                "LEFT JOIN SALARY_STATE ss ON s.id_state = ss.id_salary_state" +
                "WHERE s.month_year >= " + monthYear;

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

module.exports = { salariesGetDB };