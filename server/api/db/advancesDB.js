const pool = require('../../config/connection');

const advancesGetDB = () => {
    const sqlSelect = "SELECT a.nroDNI, a.`date`, a.amount, a.pay, e.name, e.last_name  FROM ADVANCES a  LEFT JOIN EMPLOYEES e ON a.nroDNI = e.dni WHERE  a.active = 1 ORDER BY  a.`date` DESC";

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
    const sqlUpdate = 'UPDATE ADVANCES SET active = 0 WHERE nroDNI = ? AND date = ?';
    let dni;
    let dateC;
    if (dniEmployee) dni = dniEmployee
    else throw Error('El dni es null');

    if (date) dateC = date
    else throw Error('La fecha es null');

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlUpdate, [dni, date], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            db.release();
        })
    });
};

const advancesCreateDB = (newAdvance) => {
    const sqlInsert = 'INSERT INTO ADVANCES  VALUES (?, ?, ?, ?, ?)';
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
                db.query(sqlInsert, [dniEmployee, date, amount, 0, 1], (error, result) => {
                    if (error) reject(error);
                    else {
                        resolve(result);
                    }
                });

                for (var i = 0; i < installments.length; i++) {
                    db.query(sqlInsertInstallments, [dniEmployee, date, installments[i].month, installments[i].amount,  installments[i].label, 0], (error) => {
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
    const sqlUpdateInstallments = "INSERT INTO INSTALLMENTS VALUES (?, ?, ?, ?, ?)";

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
                    db.query(sqlUpdateInstallments, [parseInt(nroDNI), date, installments[i].month, installments[i].amount,  installments[i].label], (error) => {
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

const employeeGetDB = () => {
    const sqlSelect = "SELECT dni, name, last_name, a.`date` FROM EMPLOYEES LEFT JOIN ADVANCES a ON a.nroDNI = dni WHERE EMPLOYEES.active = 1 and a.active = 1 ORDER BY last_name";

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlSelect, (error, result) => {
                if (error) reject(error);
                else {

                    let aux = [];
                    
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
            db.release();
        })
    });
};

module.exports = { advancesGetDB, installmentsGetDB, advancesDeleteDB, advancesCreateDB, advancesUpdateDB, employeeGetDB };