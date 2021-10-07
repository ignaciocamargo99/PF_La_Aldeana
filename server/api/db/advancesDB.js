const pool = require('../../config/connection');

const advancesGetDB = () => {
    const sqlSelect = "SELECT a.nroDNI, a.`date`, a.amount, a.pay, e.name, e.last_name  FROM ADVANCES a  LEFT JOIN EMPLOYEES e ON a.nroDNI = e.dni WHERE  a.active = 1";

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
    const sqlSelect = "SELECT a.nroDNI, a.`date`, i.`month`, i.amount, i.label FROM INSTALLMENTS i LEFT JOIN ADVANCES a ON i.nroDNI = a.nroDNI AND i.`date` = a.`date` WHERE a.nroDNI = " + dniEmployee + " and a.`date` = '" + date + "'";

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
    const sqlInsertInstallments = "INSERT INTO INSTALLMENTS VALUES (?, ?, ?, ?, ?)";
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
                    db.query(sqlInsertInstallments, [dniEmployee, date, installments[i].month, installments[i].amount,  installments[i].label], (error) => {
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


const advancesUpdateDB = (dniEmployee, date, updateEmployee) => {
    const sqlUpdate = `UPDATE EMPLOYEES SET dni = ?, name = ?, last_name = ?, date_admission = ?, 
                        employment_relationship = ?, charge = ?
                        WHERE dni = ?`;

    let { dni, nameEmployee, lastName, id_charge, dateN, employmentRelationship, previousDni } = updateEmployee;
    if (dni && nameEmployee && lastName && id_charge && date && employmentRelationship && dni.length === 8) {
        dni = updateEmployee.dni;
        nameEmployee = updateEmployee.nameEmployee;
        lastName = updateEmployee.lastName;
        id_charge = updateEmployee.id_charge;
        date = updateEmployee.date;
        employmentRelationship = updateEmployee.employmentRelationship;
    }
    else throw Error('Faltan datos obligatorios');

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);
            db.query(sqlUpdate, [dni, nameEmployee, lastName, date, employmentRelationship, id_charge, dniEmployee], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            db.release();
        })
    });
};

module.exports = { advancesGetDB, installmentsGetDB, advancesDeleteDB, advancesCreateDB, advancesUpdateDB };