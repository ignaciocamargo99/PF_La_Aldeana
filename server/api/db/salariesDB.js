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

const salariesCreateDB = (newSalary) => {
    const sqlInsert = 'INSERT INTO SALARIES VALUES (?, ?, ?, ?, ?, ?, ?);';
    const sqlGetIdSalary = "SELECT id_salary FROM SALARIES s ";
    const sqlGetConcepts = "SELECT * FROM CONCEPTS c";
    const sqlInsertConcept = "INSERT INTO CONCEPTS VALUES (?, ?, 1)";
    const sqlInsertHsWorked = "INSERT INTO HS_WORKED VALUES (null, ?, ?, ?, ?, ?)";
    const sqlInsertDetail = "INSERT INTO DETAIL_SALARIES VALUES (null, ?, ?, ?, ?);";

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.beginTransaction((error) => {
                if (error) reject(error);
                db.query(sqlGetIdSalary, (error, res) => {
                    if (error) {
                        console.log(error);
                        db.rollback(()=> reject(error));
                    }
                    else {
                        const id_salary = res.length +1;
                        db.query(sqlInsert, [ id_salary, newSalary.dni, newSalary.monthYear + '-01', newSalary.state, newSalary.totalHs, newSalary.subtotal, newSalary.total ], (error, result) => {
                            if (error) {
                                console.log(error);
                                db.rollback(()=> reject(error));
                            }
                            else {
                                db.query(sqlGetConcepts, (error, response) => {
                                    if (error) {
                                        console.log(error);
                                        db.rollback(()=> reject(error));
                                    }
                                    else {
                                        let r = [];
                                        response.map((res, k) => r[k] = res);
                                        let count = r.length;
                                        for (var j = 0; j < newSalary.details[0].length; j++){
                                            r?.map(concept => {
                                                if(concept.name.toUpperCase() == newSalary.details[0][j].name.toUpperCase()){
                                                    const updateHsType = "UPDATE HS_TYPES h SET h.amount = IF (" + newSalary.details[0][j].price + " = h.amount, h.amount, " + newSalary.details[0][j].price + ") WHERE h.id_hs_type = " + (j+1);
                                                    db.query(sqlInsertHsWorked, [newSalary.dni, newSalary.monthYear.length >= 7 ? newSalary.monthYear + '-01' : newSalary.monthYear, j+1, newSalary.details[0][j].hs, newSalary.details[0][j].price], (error, r) => {
                                                        if (error) {
                                                            console.log(error);
                                                            db.rollback(()=> reject(error));
                                                        } else {
                                                            db.query(updateHsType, (error, r) => {
                                                                if (error) {
                                                                    console.log(error);
                                                                    db.rollback(()=> reject(error));
                                                                } else {    db.query(sqlInsertDetail, [id_salary, concept.id_concept, newSalary.details[0][j-1].price, concept.predictive], (error) => {
                                                                    if (error) {
                                                                        console.log(error);
                                                                        db.rollback(()=> reject(error));
                                                                    }
                                                                    db.commit((error) => {
                                                                        if (error) {
                                                                            console.log(error);
                                                                            return db.rollback(() => reject(error));
                                                                        }
                                                                        else resolve();
                                                                    });
                                                                });
                                                            }});
                                                        }});
                                                }
                                            });
                                        }
                                        if (newSalary.details[1].length > 0) {
                                        for (var k = 0; k < newSalary.details[1].length; k++){
                                            let exist = false;
                                            r?.map(concept => {
                                                //console.log(concept, newSalary.details[1][k])
                                                if(concept.name.toUpperCase() == newSalary.details[1][k].name.toUpperCase()){
                                                    exist = true;
                                                    db.query(sqlInsertDetail, [id_salary, concept.id_concept, newSalary.details[1][k].price, 1], (error) => {
                                                        if (error) {
                                                            console.log(error);
                                                            db.rollback(()=> reject(error));
                                                        }
                                                        db.commit((error) => {
                                                            if (error) {
                                                                console.log(error);
                                                                return db.rollback(() => reject(error));
                                                            }
                                                            else resolve();
                                                        });
                                                    });
                                                } 
                                            });
                                            if (!exist) {
                                                count += 1;
                                                r[r.length] = {id_concept: count, name: newSalary.details[1][k].name, predictive: 1};
                                                let aux1 = count;
                                                //console.log(r[r.length], r.length)
                                                db.query(sqlInsertConcept, [count, newSalary.details[1][k].name], (error, r) => {
                                                if (error) {
                                                    console.log(error);
                                                    db.rollback(()=> reject(error));
                                                }
                                                else {
                                                    //console.log(newSalary.details[1], k)
                                                    db.query(sqlInsertDetail, [id_salary, aux1, newSalary.details[1][k-1].price, 1], (error) => {
                                                        if (error) {
                                                            console.log(error);
                                                            db.rollback(()=> reject(error));
                                                        }
                                                        db.commit((error) => {
                                                            if (error) {
                                                                console.log(error);
                                                                return db.rollback(() => reject(error));
                                                            }
                                                            else resolve();
                                                        });
                                                    });
                                                }});
                                            }
                                        }}
                                        if (newSalary.details[2].length > 0) {
                                        for (var h = 0; h < newSalary.details[2].length; h++){
                                            let exist = false;
                                            r?.map(concept => {
                                                if(concept.name.toUpperCase() == newSalary.details[2][h].name.toUpperCase()){
                                                    exist = true;
                                                    db.query(sqlInsertDetail, [id_salary, concept.id_concept, newSalary.details[2][h].price, 0], (error) => {
                                                        if (error) {
                                                            console.log(error);
                                                            db.rollback(()=> reject(error));
                                                        }
                                                        db.commit((error) => {
                                                            if (error) {
                                                                console.log(error);
                                                                return db.rollback(() => reject(error));
                                                            }
                                                            else resolve();
                                                        });
                                                    }); 
                                                } 
                                            });

                                            if (!exist) {
                                                count += 1;
                                                r[r.length] = {id_concept: count, name: newSalary.details[2][h].name, predictive: 1};
                                                let aux2 = count;
                                                //console.log(r[r.length], r.length)
                                                db.query(sqlInsertConcept, [count, newSalary.details[2][h].name], (error, r) => {
                                                if (error) {
                                                    console.log(error);
                                                    db.rollback(()=> reject(error));
                                                }
                                                else {
                                                    db.query(sqlInsertDetail, [id_salary, aux2, newSalary.details[2][h-1].price, 0], (error) => {
                                                        if (error) {
                                                            console.log(error);
                                                            db.rollback(()=> reject(error));
                                                        }
                                                        db.commit((error) => {
                                                            if (error) {
                                                                console.log(error);
                                                                return db.rollback(() => reject(error));
                                                            }
                                                            else resolve();
                                                        });
                                                    });
                                                }});
                                            }
                                        }}

                                        resolve(result);
                                    }
                                });
                            }
                        });
                    }
                });

                db.release();
            });
        });
    });
};

const salariesGetDB = (monthYear) => {
    const sqlSelect = "SELECT s.id_salary, e.dni, e.name, e.last_name, s.month_year, s.id_state, ss.name AS state, s.salary_hs , s.subtotal, s.total, er.name AS name_emp_relationship FROM SALARIES s " +
                "LEFT JOIN EMPLOYEES e ON s.dni_employee = e.dni " +
                "LEFT JOIN SALARY_STATE ss ON s.id_state = ss.id_salary_state " +
                "LEFT JOIN EMPLOYMENT_RELATIONSHIP er ON e.employment_relationship = er.id_employee_relationship " +
                "WHERE s.month_year = '" + (monthYear.length > 7 ? monthYear : (monthYear + '-01')) + "'";

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

const conceptsGetDB = (id) => {
    const sqlSelect = "SELECT * FROM CONCEPTS";

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

const detailsGetDB = (id) => {
    const sqlSelect = "SELECT * FROM DETAIL_SALARIES d JOIN CONCEPTS c ON c.id_concept = d.id_concept WHERE d.id_salary = " + id;

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

const salaryGetDB = (monthYear, dni) => {
    const sqlSelect = "SELECT s.id_salary, e.dni, e.name, e.last_name, s.month_year, s.id_state, ss.name AS state, s.salary_hs , s.subtotal, s.total, er.name AS name_emp_relationship FROM SALARIES s " +
                "LEFT JOIN EMPLOYEES e ON s.dni_employee = e.dni " +
                "LEFT JOIN SALARY_STATE ss ON s.id_state = ss.id_salary_state " +
                "LEFT JOIN EMPLOYMENT_RELATIONSHIP er ON e.employment_relationship = er.id_employee_relationship " +
                "WHERE s.month_year = '" + (monthYear.length > 7 ? monthYear : (monthYear + '-01')) + "' AND e.dni = " + dni;
    //console.log(sqlSelect)

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
const calcHs = (hs, res) => {
    if (res.employment_relationship === 1) hs - 6 < 0 ? hs = 0 : hs -= 6;
    else if (res.employment_relationship === 3) hs - 4 < 0 ? hs = 0 : hs -= 4;
    return hs;
}
const hsWorkedGetDB = (monthYear, dni, nonWorkingDays) => {
    const sqlSelect = "SELECT hw.*, e.name, e.last_name, ht.name AS hs_type FROM HS_WORKED hw " +
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
                    const sqlAlterSelect = "SELECT * FROM ASSISTANCE_EMPLOYEES s LEFT JOIN EMPLOYEES e ON e.dni = s.employee WHERE date_entry >= '" + monthYear + "-01' and date_egress < '" +
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
                                        aux[i] = {month_year: monthYear, id_hs_type: typeHS.id_hs_type, hs_number: 0, hs_type: typeHS.name, amount: typeHS.amount, id_hs_worked: 0};
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
                                        //console.log(isWeekend , isWeekendTo)
                                        let absHs = (new Date(assistance.date_egress).getTime() - new Date(assistance.date_entry).getTime())/1000/60/60;

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
                                                else aux[0].hs_number += calcHs(hs, assistance);
                                            } else if (isWeekend) {
                                                let hsTo = (new Date(yearTo, monthTo, dayTo, hoursTo, minutesTo).getTime() - new Date(year, month, day, 23, 59).getTime())/1000/60/60;
                                                let hs = (new Date(year, month, day, 23, 59).getTime() - new Date(year, month, day, hours, minutes).getTime())/1000/60/60;
                                                aux[1].hs_number += hs;
                                                aux[0].hs_number += calcHs(hsTo, assistance);
                                            } else {
                                                let hsTo = (new Date(yearTo, monthTo, dayTo, hoursTo, minutesTo).getTime() - new Date(year, month, day, 13).getTime())/1000/60/60;
                                                let hs = (new Date(yearTo, monthTo, dayTo, 13).getTime() - new Date(year, month, day, hours, minutes).getTime())/1000/60/60;
                                                aux[1].hs_number += hsTo;
                                                aux[0].hs_number += calcHs(hs, assistance);
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


const salariesUpdateDB = (id, newSalary) => {
    const sqlInsert = 'UPDATE SALARIES SET id_state = 2, salary_hs = ?, subtotal = ?, total = ? WHERE id_salary = ?';
    const sqlGetConcepts = "SELECT * FROM CONCEPTS c";
    const sqlClearDetails = "DELETE FROM DETAIL_SALARIES WHERE id_detail_salary = " + id + " AND id_concept > 5; ";
    const sqlInsertConcept = "INSERT INTO CONCEPTS VALUES (?, ?, 1)";
    const sqlInsertHsWorked = "UPDATE HS_WORKED SET amount = ? WHERE id_hs_worked = ?";
    const sqlInsertDetail = "INSERT INTO DETAIL_SALARIES VALUES (null, ?, ?, ?, ?);";

    //console.log(newSalary.details)

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.beginTransaction((error) => {
                if (error) reject(error);
                    db.query(sqlInsert, [ newSalary.totalHs, newSalary.subtotal, newSalary.total, parseInt(id) ], (error, result) => {
                        if (error) {
                            console.log(error);
                            db.rollback(()=> reject(error));
                        }
                        else {
                            db.query(sqlClearDetails, (error, respons) => {
                                if (error) {
                                    console.log(error);
                                    db.rollback(()=> reject(error));
                                }
                                else {
                                    db.query(sqlGetConcepts, (error, response) => {
                                        if (error) {
                                            console.log(error);
                                            db.rollback(()=> reject(error));
                                        }
                                        else {
                                            let r = [];
                                            response.map((res, k) => r[k] = res);
                                            let count = r.length;
                                            for (var j = 0; j < newSalary.details[0].length; j++){
                                                r?.map(concept => {
                                                    if(concept.name.toUpperCase() == newSalary.details[0][j].name.toUpperCase()){
                                                        const updateHsType = "UPDATE HS_TYPES h SET h.amount = IF (" + newSalary.details[0][j].price + " = h.amount, h.amount, " + newSalary.details[0][j].price + ") WHERE h.id_hs_type = " + (j+1);
                                                        db.query(sqlInsertHsWorked, [newSalary.details[0][j].price, newSalary.details[0][j].id_hs_worked], (error, r) => {
                                                            if (error) {
                                                                console.log(error);
                                                                db.rollback(()=> reject(error));
                                                            } else {
                                                                db.query(updateHsType, (error, r) => {
                                                                    if (error) {
                                                                        console.log(error);
                                                                        db.rollback(()=> reject(error));
                                                                    } else {    db.query(sqlInsertDetail, [id, concept.id_concept, newSalary.details[0][j-1].price, concept.predictive], (error) => {
                                                                        if (error) {
                                                                            console.log(error);
                                                                            db.rollback(()=> reject(error));
                                                                        }
                                                                        db.commit((error) => {
                                                                            if (error) {
                                                                                console.log(error);
                                                                                return db.rollback(() => reject(error));
                                                                            }
                                                                            else resolve();
                                                                        });
                                                                    });
                                                                }});
                                                            }});
                                                    }
                                                });
                                            }
                                            if (newSalary.details[1].length > 0) {
                                            for (var k = 0; k < newSalary.details[1].length; k++){
                                                let exist = false;
                                                r?.map(concept => {
                                                    //console.log(concept, newSalary.details[1][k])
                                                    if(concept.name.toUpperCase() == newSalary.details[1][k].name.toUpperCase()){
                                                        exist = true;
                                                        db.query(sqlInsertDetail, [id, concept.id_concept, newSalary.details[1][k].price, 1], (error) => {
                                                            if (error) {
                                                                console.log(error);
                                                                db.rollback(()=> reject(error));
                                                            }
                                                            db.commit((error) => {
                                                                if (error) {
                                                                    console.log(error);
                                                                    return db.rollback(() => reject(error));
                                                                }
                                                                else resolve();
                                                            });
                                                        });
                                                    } 
                                                });
                                                if (!exist) {
                                                    count += 1;
                                                    r[r.length] = {id_concept: count, name: newSalary.details[1][k].name, predictive: 1};
                                                    let aux1 = count;
                                                    //console.log(r[r.length], r.length)
                                                    db.query(sqlInsertConcept, [count, newSalary.details[1][k].name], (error, r) => {
                                                    if (error) {
                                                        console.log(error);
                                                        db.rollback(()=> reject(error));
                                                    }
                                                    else {
                                                        //console.log(newSalary.details[1], k)
                                                        db.query(sqlInsertDetail, [id, aux1, newSalary.details[1][k-1].price, 1], (error) => {
                                                            if (error) {
                                                                console.log(error);
                                                                db.rollback(()=> reject(error));
                                                            }
                                                            db.commit((error) => {
                                                                if (error) {
                                                                    console.log(error);
                                                                    return db.rollback(() => reject(error));
                                                                }
                                                                else resolve();
                                                            });
                                                        });
                                                    }});
                                                }
                                            }}
                                            if (newSalary.details[2].length > 0) {
                                            for (var h = 0; h < newSalary.details[2].length; h++){
                                                let exist = false;
                                                r?.map(concept => {
                                                    if(concept.name.toUpperCase() == newSalary.details[2][h].name.toUpperCase()){
                                                        exist = true;
                                                        db.query(sqlInsertDetail, [id, concept.id_concept, newSalary.details[2][h].price, 0], (error) => {
                                                            if (error) {
                                                                console.log(error);
                                                                db.rollback(()=> reject(error));
                                                            }
                                                            db.commit((error) => {
                                                                if (error) {
                                                                    console.log(error);
                                                                    return db.rollback(() => reject(error));
                                                                }
                                                                else resolve();
                                                            });
                                                        }); 
                                                    } 
                                                });

                                                if (!exist) {
                                                    count += 1;
                                                    r[r.length] = {id_concept: count, name: newSalary.details[2][h].name, predictive: 1};
                                                    let aux2 = count;
                                                    console.log(r[r.length], r.length)
                                                    db.query(sqlInsertConcept, [count, newSalary.details[2][h].name], (error, r) => {
                                                    if (error) {
                                                        console.log(error);
                                                        db.rollback(()=> reject(error));
                                                    }
                                                    else {
                                                        db.query(sqlInsertDetail, [id, aux2, newSalary.details[2][h-1].price, 0], (error) => {
                                                            if (error) {
                                                                console.log(error);
                                                                db.rollback(()=> reject(error));
                                                            }
                                                            db.commit((error) => {
                                                                if (error) {
                                                                    console.log(error);
                                                                    return db.rollback(() => reject(error));
                                                                }
                                                                else resolve();
                                                            });
                                                        });
                                                    }});
                                                }
                                            }}

                                            resolve(result);
                                        }
                                    });
                                }
                            });
                        }
                    });
                db.release();
            });
        });
    });
};

module.exports = { salariesGetDB, hsWorkedGetDB, bonusGetDB, salariesCreateDB, salaryGetDB, salariesUpdateDB, detailsGetDB, conceptsGetDB };