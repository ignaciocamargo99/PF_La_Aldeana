const pool = require('../../config/connection');

function formattedDate (dateState) {
    var year = dateState.getFullYear();
    var month = dateState.getMonth() + 1;
    var day = dateState.getDate();
    var dateFormatted = year + "-" + month + "-" + day;
    if (dateFormatted.toString().length === 9) {
        if(month.toString().length === 1)
        {
            var monthFormatted = "0" + month;
            return dateFormatted = year + "-" + monthFormatted + "-" + day;
        }
        else if(day.toString().length === 1){
            var dayFormatted = "0" + day;
            return dateFormatted = year + "-" + month + "-" + dayFormatted;    
        }
    }
    else if(dateFormatted.toString().length === 8) {
        monthFormatted = "0" + month;
        dayFormatted = "0" + day;
        return dateFormatted = year + "-" + monthFormatted + "-" + dayFormatted;
    }

    return dateFormatted;
}

const salariesGetDB = (monthYear) => {
    const sqlSelect = "SELECT s.id_salary, s.dni_employee, e.name, e.last_name, s.month_year, s.id_state, ss.name AS state, s.salary_hs , s.subtotal, s.total FROM SALARIES s " +
                "LEFT JOIN EMPLOYEES e ON s.dni_employee = e.dni " +
                "LEFT JOIN SALARY_STATE ss ON s.id_state = ss.id_salary_state " +
                "WHERE s.month_year >= '" + monthYear + "'";

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlSelect, (error, result) => {
                if (error) {
                    reject(error);
                }
                else resolve(result);
            });
            db.release();
        })
    });
};

const hsWorkedGetDB = (monthYear, dni) => {
    const sqlSelect = "SELECT hw.*, e.name, e.last_name, ht.name AS hs_type, ht.amount FROM HS_WORKED hw " +
                    "LEFT JOIN EMPLOYEES e ON e.dni = hw.dni_employee " +
                    "LEFT JOIN HS_TYPES ht ON ht.id_hs_type = hw.id_hs_type " +
                    "WHERE hw.month_year = '" + monthYear + "' AND hw.dni_employee = " + dni;

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlSelect, (error, result) => {
                if (error) reject(error);
                else if (result.length() === 0) {
                    const sqlAlterSelect = "SELECT * FROM ASSISTANCE_EMPLOYEES s WHERE date_entry >= '" + monthYear + "' and date_egress < '" +
                    formattedDate(new Date(parseInt(monthYear.slice(0,-5)), parseInt(monthYear.slice(5, -3)) + 1 , parseInt(monthYear.slice(8))))
                    + "' AND employee = " + dni;

                    db.query(sqlAlterSelect, (err, res) => {
                        if (err) reject(err);
                        else {
                            const sqlTypeHS = "SELECT * FROM HS_TYPES ht";
                            db.query(sqlTypeHS, (e, r) => {
                                if (e) reject(e);
                                else {
                                    let aux = [];

                                    r.map((typeHS, i) => {
                                        aux[i] = {month_year: monthYear, id_hs_type: typeHS.id_hs_type, hs_number: 0, hs_type: typeHS.name, amount: typeHS.amount};
                                    });

                                    res.map(assistance => {
                                        let date = new Date(assistance.date_entry).getDay();
                                        let hs = (new Date(assistance.date_entry).getTime() - new Date(assistance.date_egress).getTime())/1000/60/60;

                                        if (date === 0 || date === 6) {
                                            aux[1].hs_number += hs;
                                        } else {
                                            aux[0].hs_number += hs;
                                        }
                                    });

                                    resolve(aux);
                                }
                            });
                            db.release();
                        }
                    });
                    db.release();

                } else resolve(result);
            });
            db.release();
        })
    });
};

const bonusGetDB = (monthYear, dni) => {
    const sqlSelect = "SELECT s.id_salary, s.dni_employee, e.name, e.last_name, s.month_year, s.id_state, ss.name AS state, s.salary_hs , s.subtotal, s.total FROM SALARIES s " +
    "LEFT JOIN EMPLOYEES e ON s.dni_employee = e.dni " +
    "LEFT JOIN SALARY_STATE ss ON s.id_state = ss.id_salary_state " +
    "WHERE s.month_year >= '" + monthYear.slice(0,-5) + parseInt(monthYear.slice(5,-3)) <= 8 ? "01-01" : "07-01" + "' AND s.month_year <= '" +
    monthYear.slice(0,-5) + parseInt(monthYear.slice(5,-3)) <= 8 ? "06-01" : "12-01" + "' AND s.dni_employee = " + dni +
    " ORDER BY s.total;";

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

module.exports = { salariesGetDB, hsWorkedGetDB, bonusGetDB };