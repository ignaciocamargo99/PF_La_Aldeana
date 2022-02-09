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
    const sqlSelect = "SELECT s.id_salary, s.dni_employee, e.name, e.last_name, s.month_year, s.id_state, ss.name AS state, s.salary_hs , s.subtotal, s.total, er.name AS name_emp_relationship FROM SALARIES s " +
                "LEFT JOIN EMPLOYEES e ON s.dni_employee = e.dni " +
                "LEFT JOIN SALARY_STATE ss ON s.id_state = ss.id_salary_state " +
                "LEFT JOIN EMPLOYMENT_RELATIONSHIP er ON e.employment_relationship = er.id_employee_relationship " +
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

const hsWorkedGetDB = (monthYear, dni, nonWorkingDays) => {
    const sqlSelect = "SELECT hw.*, e.name, e.last_name, ht.name AS hs_type, ht.amount FROM HS_WORKED hw " +
                    "LEFT JOIN EMPLOYEES e ON e.dni = hw.dni_employee " +
                    "LEFT JOIN HS_TYPES ht ON ht.id_hs_type = hw.id_hs_type " +
                    "WHERE hw.month_year = '" + monthYear + "' AND hw.dni_employee = " + dni;

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlSelect, (error, result) => {
                if (error) {
                    console.log(error);
                    reject("1:" + error);
                }
                else if (result.length === 0) {
                    const sqlAlterSelect = "SELECT * FROM ASSISTANCE_EMPLOYEES s WHERE date_entry >= '" + monthYear + "-01' and date_egress < '" +
                    formattedDate(new Date(parseInt(monthYear.slice(0,-3)), parseInt(monthYear.slice(5)) + 1 , 1))
                    + "' AND employee = " + dni;

                    db.query(sqlAlterSelect, (err, res) => {
                        if (err) {
                            console.log(err);
                            reject("2:" + err);
                        }
                        else {
                            const sqlTypeHS = "SELECT * FROM HS_TYPES ht";
                            db.query(sqlTypeHS, (e, r) => {
                                if (e) {
                                    console.log(e);
                                    reject("3:" + e);
                                }
                                else {
                                    let aux = [];

                                    r.map((typeHS, i) => {
                                        aux[i] = {month_year: monthYear, id_hs_type: typeHS.id_hs_type, hs_number: 0, hs_type: typeHS.name, amount: typeHS.amount};
                                    });

                                    res.map(assistance => {
                                        let date = new Date(assistance.date_entry).getDay();
                                        let day = new Date(assistance.date_entry).getDate();
                                        let month = new Date(assistance.date_entry).getMonth();
                                        let hours = new Date(assistance.date_entry).getHours();
                                        let minutes = new Date(assistance.date_entry).getMinutes();
                                        let year = new Date(assistance.date_entry).getFullYear();
                                        let dateTo = new Date(assistance.date_egress).getDay();
                                        let dayTo = new Date(assistance.date_egress).getDate();
                                        let monthTo = new Date(assistance.date_egress).getMonth();
                                        let hoursTo = new Date(assistance.date_egress).getHours();
                                        let minutesTo = new Date(assistance.date_egress).getMinutes();
                                        let yearTo = new Date(assistance.date_egress).getFullYear();
                                        let isNonWorked = false;
                                        let isNonWorkedTo = false;
                                        let isWeekend = (date === 0 || (date === 6 && hours >= 13 ? true : (hours === 13 && minutes > 0)));
                                        let isWeekendTo = (dateTo === 0 || (dateTo === 6 && hoursTo >= 13 ? true : (hoursTo === 13 && minutesTo > 0)));
                                        console.log(isWeekend , isWeekendTo)
                                        
                                        nonWorkingDays?.map(holiday => {
                                            if (holiday.day === day && holiday.month === month) isNonWorked = true;
                                            if (holiday.day === dayTo && holiday.month === monthTo) isNonWorkedTo = true;
                                        });

                                        if (isNonWorked) {
                                            if (isWeekend === isWeekendTo) {
                                                let hs = (new Date(assistance.date_egress).getTime() - new Date(assistance.date_entry).getTime())/1000/60/60;
                                                if (isWeekendTo) aux[3].hs_number += hs;
                                                else aux[2].hs_number += hs;
                                            } else if (isWeekend) {
                                                let hs = (new Date(assistance.date_egress).getTime() - new Date(yearTo, monthTo, dayTo, 23, 59).getTime())/1000/60/60;
                                                let hsTo = (new Date(year, month, day, 23, 59).getTime() - new Date(assistance.date_entry).getTime())/1000/60/60;
                                                aux[3].hs_number += hsTo;
                                                aux[2].hs_number += hs;
                                            } else {
                                                let hsTo = (new Date(assistance.date_egress).getTime() - new Date(year, month, day, 13).getTime())/1000/60/60;
                                                let hs = (new Date(yearTo, monthTo, dayTo, 13).getTime() - new Date(assistance.date_entry).getTime())/1000/60/60;
                                                aux[3].hs_number += hsTo;
                                                aux[2].hs_number += hs;
                                            }
                                        } else {
                                            if (isWeekend === isWeekendTo) {
                                                let hs = (new Date(yearTo, monthTo, dayTo, hoursTo, minutesTo).getTime() - new Date(year, month, day, hours, minutes).getTime())/1000/60/60;
                                                if (isWeekendTo) aux[1].hs_number += hs;
                                                else aux[0].hs_number += hs;
                                            } else if (isWeekend) {
                                                let hsTo = (new Date(yearTo, monthTo, dayTo, hoursTo, minutesTo).getTime() - new Date(year, month, day, 23, 59).getTime())/1000/60/60;
                                                let hs = (new Date(year, month, day, 23, 59).getTime() - new Date(year, month, day, hours, minutes).getTime())/1000/60/60;
                                                console.log( new Date(yearTo, monthTo, dayTo, hoursTo, minutesTo) , new Date(year, month, day, 23, 59), new Date(year, month, day, hours, minutes))
                                                aux[1].hs_number += hs;
                                                aux[0].hs_number += hsTo;
                                            } else {
                                                let hsTo = (new Date(yearTo, monthTo, dayTo, hoursTo, minutesTo).getTime() - new Date(year, month, day, 13).getTime())/1000/60/60;
                                                let hs = (new Date(yearTo, monthTo, dayTo, 13).getTime() - new Date(year, month, day, hours, minutes).getTime())/1000/60/60;
                                                aux[1].hs_number += hsTo;
                                                aux[0].hs_number += hs;
                                            }
                                        }
                                    });

                                    resolve(aux);
                                }
                            });
                        }
                    });
                } else resolve(result);
            });
            db.release();
        })
    });
};

const bonusGetDB = (monthYear, dni) => {
    const sqlSelect = "SELECT s.id_salary, s.dni_employee, e.name, e.last_name, s.month_year, s.id_state, ss.name AS state, s.salary_hs , s.subtotal, s.total, er.name AS name_emp_relationship FROM SALARIES s " +
    "LEFT JOIN EMPLOYEES e ON s.dni_employee = e.dni " +
    "LEFT JOIN EMPLOYMENT_RELATIONSHIP er ON e.employment_relationship = er.id_employee_relationship " +
    "LEFT JOIN SALARY_STATE ss ON s.id_state = ss.id_salary_state " +
    "WHERE s.month_year >= '" + monthYear.slice(0,-5) + (parseInt(monthYear.slice(5,-3)) <= 8 ? "01-01" : "07-01") + "' AND s.month_year < '" +
    monthYear.slice(0,-5) + (parseInt(monthYear.slice(5,-3)) <= 8 ? "06-01" : "12-01" )+ "' AND s.dni_employee = " + dni +
    " ORDER BY s.total;";

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlSelect, (error, result) => {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                else resolve(result);
            });
            db.release();
        })
    });
};

module.exports = { salariesGetDB, hsWorkedGetDB, bonusGetDB };