const pool = require('../../config/connection');

const advancesGetDB = () => {
    const sqlSelect = "SELECT a.nroDNI, a.`date`, a.amount, a.pay, e.name, e.last_name  FROM ADVANCES a  LEFT JOIN EMPLOYEES e ON a.nroDNI = e.dni WHERE e.active = 1 ORDER BY e.last_name ASC , e.name ASC ,  a.`date` DESC";

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

const installmentsToPayGetDB = (dniEmployee, date) => {
    const sqlSelect = "SELECT a.nroDNI, a.`date`, i.`month`, i.amount, i.label, i.pay FROM INSTALLMENTS i LEFT JOIN ADVANCES a ON i.nroDNI = a.nroDNI AND i.`date` = a.`date` WHERE a.nroDNI = " + 
    dniEmployee + " AND  `month` = '" + date + "' AND i.pay = 0";
    
    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlSelect, (e, result) => {
                if (e) {
                    console.log(e);
                    reject(e);
                }
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
                    if (error) {
                        db.rollback(() => reject(error));
                    }
                    else {
                        for (var i = 0; i < installments.length; i++) {
                            db.query(sqlInsertInstallments, [dniEmployee, date, installments[i].month, installments[i].amount, installments[i].label, 0], (error) => {
                                if (error) {
                                    db.rollback(() => reject(error));
                                }
                                db.commit((error) => {
                                    if (error) {
                                        return db.rollback(() => reject(error));
                                    }
                                    else resolve();
                                });
                            })
                        };
                        resolve(result);
                    }
                });

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
    if (dniEmployee && amount && installments && date && dniEmployee <= 99999999 && dniEmployee >= 10000000) {
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
                    db.query(sqlUpdateInstallments, [parseInt(nroDNI), date, installments[i].month, installments[i].amount, installments[i].label, installments[i].pay], (error) => {
                        if (error) {
                            console.log(error)
                            db.rollback(() => reject(error));
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
const installmentsPayDB = (nroDNI, date, installments) => {
    const sqlUpdate = "UPDATE ADVANCES SET pay = pay + ? WHERE nroDNI = " + nroDNI + " AND  `date` = ?";
    const sqlUpdateInstallments = "UPDATE INSTALLMENTS SET pay = 1 WHERE nroDNI = " + nroDNI + " AND  `month` = '" + date + "' AND `date` = ?";
    const inst = installments.advances;

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.beginTransaction((error) => {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    for (var i = 0; i < inst.length; i++) {
                        db.query(sqlUpdate, [inst[i].amount, inst[i].date], (err, result) => {
                            if (err) {
                                console.log(err);
                                reject(err);
                            } else {
                                resolve(result);
                            }
                        });

                        db.query(sqlUpdateInstallments, [inst[i].date], (error) => {
                            if (error) {
                                console.log(error)
                                db.rollback(()=> reject(error));
                            } else {
                                db.commit((e) => {
                                    if (e) {
                                        console.log(e)
                                        return db.rollback(() => reject(e));
                                    }
                                    else resolve();
                                });
                            }
                        });
                    };
                }
                db.release();
            });
        });
    });
};

const employeeGetDB = () => {

    const sqlSelect = `SELECT dni, name, last_name
                    FROM EMPLOYEES e WHERE e.active = 1 ORDER BY last_name`;
    const sqlSelect2 = "SELECT dni, name, last_name, a.`date` FROM EMPLOYEES e JOIN ADVANCES a ON a.nroDNI = dni WHERE e.active = 1 ORDER BY last_name";

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
                            res?.forEach((employee, i) => { aux.push({ dni: employee.dni, name: employee.name, last_name: employee.last_name, advance: 0 }) });

                            result?.forEach((employee, i) => {
                                if (!aux.some(item => item.dni === employee.dni)) {
                                    aux.push({ dni: employee.dni, name: employee.name, last_name: employee.last_name, advance: 1 })
                                } else {
                                    aux?.forEach(element => {
                                        if (element.dni === employee.dni) {
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

module.exports = { advancesGetDB, installmentsGetDB, advancesDeleteDB, advancesCreateDB, advancesUpdateDB, employeeGetDB, installmentsToPayGetDB, installmentsPayDB };