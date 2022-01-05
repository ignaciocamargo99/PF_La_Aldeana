const pool = require('../../config/connection');

const assistanceDB = (dni) => {
    sqlSelectAssistance = `SELECT date_egress, date_entry, id_assistance 
        FROM ASSISTANCE_EMPLOYEES 
        WHERE id_assistance = (SELECT MAX(id_assistance) FROM ASSISTANCE_EMPLOYEES WHERE employee = ${dni})`;

        return new Promise((resolve, reject) => {
            pool.getConnection((error, db) => {
                if (error) reject(error);
    
                db.query(sqlSelectAssistance, (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                });
                db.release();
            })
        });
}

const checkInOutDB = (dni, check) => {
    let { datetime } = check;
    
    sqlSelectLastDate = `SELECT date_egress AS last_date_egress, id_assistance AS last_id_assistance 
        FROM ASSISTANCE_EMPLOYEES 
        WHERE id_assistance = (SELECT MAX(id_assistance) FROM ASSISTANCE_EMPLOYEES WHERE employee = ${dni})`

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject('0:' + error);
            db.beginTransaction((error) => {
                db.query(sqlSelectLastDate, (error, result) => {
                    if (error) reject('1:' + error);
                    else 
                    {
                        console.log("resultao 1", result[0]);
                        let { last_date_egress, last_id_assistance } = result[0];
                        console.log("last ID:", last_id_assistance, last_date_egress);

                        if (last_date_egress != null)
                        {
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
                        }                        
                        db.query(sqlCheck, (error, result) => {
                            if (error) {
                                return db.rollback(() => reject('3:' + error))
                            }
                            db.commit((error) => {
                                if (error) {
                                    return db.rollback(() => reject('4:' + error));
                                }
                                else resolve(result);
                            });
                        })
                    }
                })
            })
            db.release();
        })
    });
}

module.exports = { checkInOutDB, assistanceDB };