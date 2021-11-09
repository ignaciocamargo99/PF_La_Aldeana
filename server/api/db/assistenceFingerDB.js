const pool = require('../../config/connection');

const checkInOutDB = (check) => {

    let last_date;
    let last_id;
    let { dniEmployee, dayHour } = check;

    // averiguar sobre ultima asistencia del empleado pasado
    
    sqlSelectLastDate = `SELECT date_egress AS last_date_egress, id_assistance AS last_id_assistance 
        FROM ASSISTANCE_EMPLOYEES 
        WHERE id_assistance = (SELECT MAX(id_assistance) FROM ASSISTANCE_EMPLOYEES WHERE employee = ${dniEmployee})`


    // declarar sentencias insert y update
 
    // definir si es una entrada o salida

    // devolver la info del registro creado


    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject('0:' + error);

            db.beginTransaction((error) => {

                db.query(sqlSelectLastDate, (error, result) => {
                    if (error) reject('1:' + error);
    
                    else 
                    {
                        console.log(result);
                        last_date = result[0].last_date_egress;
                        last_id = result[0].last_id_assistence;

                        if (last_date != null)
                        {
                            // es un ingreso
                            sqlCheck = `INSERT INTO ASSISTANCE_EMPLOYEES (date_entry, employee) VALUES (${dayHour}, ${dniEmployee})`
                        } else 
                        {
                            // es un egreso
                            sqlCheck = `UPDATE ASSISTANCE_EMPLOYEES SET date_egress = ${dayHour} WHERE id_assistance = ${last_id}`
                        }
                        db.query(sqlCheck, (error, result) => {
                            if (error) {
                                return db.rollback(() => reject('3:' + error))
                            }
                            else {
                                sqlSelectLastAssistance = ` `

                                db.query(sqlCheck, (error, result) => {
                                    if (error) {
                                        return db.rollback(() => reject('4:' + error))
                                    }
                                    db.commit((error) => {
                                        if (error) {
                                            return db.rollback(() => reject('5:' + error));
                                        }
                                        else resolve(result);
                                    });
                                });
                            }
                        })
                    }
                })
            })
            db.release();
        })
    });
}

module.exports = { checkInOutDB };