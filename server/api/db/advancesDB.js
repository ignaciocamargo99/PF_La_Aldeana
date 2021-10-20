const pool = require('../../config/connection');
function formattedDate (dateState, quantityMonth, quantityDay) {
    var year = dateState.getFullYear();
    var month;
    if (quantityMonth) {
        month = dateState.getMonth() + quantityMonth;
    } else month = dateState.getMonth() + 1;


    var day = dateState.getDate();
    if (quantityDay) {
        day = dateState.getDate() + quantityDay;
        if (day < 1){
            day = dateState.getDate();
            month --;
        }
    } else day = dateState.getDate();

    

    if (month > 12){
        month = month - 12;
        year ++;
    }
    if (month < 1){
        month = month + 12;
        year --;
    }
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

const advancesGetDB = () => {
    const sqlSelect = "SELECT a.nroDNI, a.`date`, a.amount, a.pay, e.name, e.last_name  FROM ADVANCES a  LEFT JOIN EMPLOYEES e ON a.nroDNI = e.dni ORDER BY  a.`date` DESC";

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

const installmentsGetDB = (dniEmployee, date) => {
    const sqlSelect = "SELECT a.nroDNI, a.`date`, i.`month`, i.amount, i.label, i.pay FROM INSTALLMENTS i LEFT JOIN ADVANCES a ON i.nroDNI = a.nroDNI AND i.`date` = a.`date` WHERE a.nroDNI = " + dniEmployee + " and a.`date` = '" + date + "'";

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

const advancesDeleteDB = (dniEmployee, date) => {
    const sqlUpdate = 'DELETE FROM ADVANCES WHERE nroDNI = ? AND `date` = ?';
    const sqlDelete = "DELETE FROM INSTALLMENTS WHERE nroDNI = ? and `date` = ?";
    let dni;
    let dateC;
    if (dniEmployee) dni = dniEmployee
    else throw Error('El dni es null');

    if (date) dateC = date
    else throw Error('La fecha es null');

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlDelete, [dni, date], (error, result) => {
                if (error) reject(error);
                else {
                    db.query(sqlUpdate, [dni, date], (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    });
                }
            });
            db.release();
        })
    });
};

const advancesCreateDB = (newAdvance) => {
    const sqlInsert = 'INSERT INTO ADVANCES  VALUES (?, ?, ?, ?)';
    const sqlInsertInstallments = "INSERT INTO INSTALLMENTS VALUES (?, ?, ?, ?, ?, ?)";
    let { dniEmployee, date, amount, installments, months } = newAdvance;
    if (dniEmployee && date && amount && installments && months && dniEmployee <= 99999999 && dniEmployee >= 10000000) {
        dniEmployee = newAdvance.dniEmployee;
        date = newAdvance.date;
        amount = newAdvance.amount;
        installments = newAdvance.installments;
        months = newAdvance.months;
    }
    else throw Error('Faltan datos obligatorios');

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.beginTransaction((error) => {
                if (error) reject(error);
                db.query(sqlInsert, [dniEmployee, date, amount, 0], (error, result) => {
                    if (error) reject(error);
                    else {
                        resolve(result);
                    }
                });

                for (var i = 0; i < installments.length; i++) {
                    db.query(sqlInsertInstallments, [dniEmployee, date, formattedDate(new Date(installments[i].month)), installments[i].amount,  installments[i].label, 0], (error) => {
                        if (error) {
                            db.rollback(()=> reject(error));
                        }
                        db.commit((error) => {
                            if (error) {
                                return db.rollback(() => reject(error));
                            }
                            else resolve();
                        });
                    })
                };
                db.release();
            });
        });
    });
};


const advancesUpdateDB = (nroDNI, dateOld, updateAdvances) => {
    const sqlUpdate = "UPDATE ADVANCES a SET a.amount = ? WHERE a.nroDNI = ? and a.`date` = ?";
    const sqlDelete = "DELETE FROM INSTALLMENTS WHERE nroDNI = ? and `date` = ?";
    const sqlUpdateInstallments = "INSERT INTO INSTALLMENTS VALUES (?, ?, ?, ?, ?, ?)";

    let { dniEmployeeOld, date, amount, pay, name, last_name, title, dniEmployee, installments } = updateAdvances;
    if (dniEmployee && amount && installments && date &&  dniEmployee <= 99999999 && dniEmployee >= 10000000) {
        dniEmployee = updateAdvances.dniEmployee;
        amount = updateAdvances.amount;
        installments = updateAdvances.installments;
        date = updateAdvances.date;
    }
    else throw Error('Faltan datos obligatorios');

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.beginTransaction((error) => {
                if (error) reject(error);
                db.query(sqlUpdate, [amount, parseInt(nroDNI), date], (error, result) => {
                    if (error) reject(error);
                    else {
                        resolve(result);
                    }
                });
                db.query(sqlDelete, [parseInt(nroDNI), date], (error, result) => {
                    if (error) reject(error);
                    else {
                        resolve(result);
                    }
                });

                for (var i = 0; i < installments.length; i++) {
                    db.query(sqlUpdateInstallments, [parseInt(nroDNI), date, formattedDate(new Date(installments[i].month)), installments[i].amount,  installments[i].label, installments[i].pay], (error) => {
                        if (error) {
                            console.log(error)
                            db.rollback(()=> reject(error));
                        }
                        db.commit((error) => {
                            if (error) {
                                console.log(error)
                                return db.rollback(() => reject(error));
                            }
                            else resolve();
                        });
                    })
                };
                db.release();
            });
        });
    });
};

const employeeGetDB = () => {

    const sqlSelect = `SELECT dni, name, last_name
                    FROM EMPLOYEES ORDER BY last_name`;
    const sqlSelect2 = "SELECT dni, name, last_name, a.`date` FROM EMPLOYEES LEFT JOIN ADVANCES a ON a.nroDNI = dni ORDER BY last_name";

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlSelect, (error, res) => {
                if (error) reject(error);
                else {

                    db.query(sqlSelect2, (error, result) => {
                        if (error) reject(error);
                            else {
                                let aux = [];
                                res?.forEach((employee, i)=>{aux.push({dni: employee.dni, name: employee.name, last_name: employee.last_name, advance: 0})});
                                
                                result?.forEach((employee, i)=>{
                                    if (!aux.some(item => item.dni === employee.dni)){
                                        aux.push({dni: employee.dni, name: employee.name, last_name: employee.last_name, advance: 1})
                                    } else {
                                        aux?.forEach(element => {
                                            if (element.dni === employee.dni){
                                                element.advance += 1;
                                            }
                                        });
                                    }
                                });

                                resolve(aux);
                            }
                        });
                    }
            });
            db.release();
        })
    });
};

module.exports = { advancesGetDB, installmentsGetDB, advancesDeleteDB, advancesCreateDB, advancesUpdateDB, employeeGetDB };