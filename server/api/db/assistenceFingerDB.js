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
        });
    });
};

const checkInOutDB = (dni, check) => {
    let { datetime } = check;

    sqlSelectLastDate = `SELECT date_egress AS last_date_egress, id_assistance AS last_id_assistance 
        FROM ASSISTANCE_EMPLOYEES 
        WHERE id_assistance = (SELECT MAX(id_assistance) FROM ASSISTANCE_EMPLOYEES WHERE employee = ${dni})`;

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject('0:' + error);
            db.beginTransaction((error) => {
                db.query(sqlSelectLastDate, (error, result) => {
                    if (error) reject('1:' + error);
                    else {
                        if (result.length > 0) {
                            let { last_date_egress, last_id_assistance } =
                                result[0];

                            if (last_date_egress != null) {
                                // es un ingreso
                                sqlCheck = `INSERT INTO ASSISTANCE_EMPLOYEES (date_entry, employee) VALUES ('${datetime}', ${dni})`;
                            } else {
                                // es un egreso
                                sqlCheck = `UPDATE ASSISTANCE_EMPLOYEES SET date_egress = '${datetime}' WHERE id_assistance = ${last_id_assistance}`;
                            }
                        } else {
                            // es un primer ingreso
                            sqlCheck = `INSERT INTO ASSISTANCE_EMPLOYEES (date_entry, employee) VALUES ('${datetime}', ${dni})`;
                        }

                        db.query(sqlCheck, (error, result) => {
                            if (error) {
                                return db.rollback(() => reject('3:' + error));
                            }
                            db.commit((error) => {
                                if (error) {
                                    return db.rollback(() =>
                                        reject('4:' + error)
                                    );
                                } else resolve(result);
                            });
                        });
                    }
                });
            });
            db.release();
        });
    });
};

const allAssistanceDB = () => {
    // validar que si la request llega un dia a las 2 de la mañana (o despues de las 21), siga siendo el mismo dia
    let date = new Date();

    // validacion
    // let dateCurrentHours = new Date().getHours();
    // let dateCurrentDay = new Date().getDate();

    // if (dateCurrentHours >= 21) {
    //     // cambiamos el horario en horas o el dia para que sea el que corresponde
    //     date.setDate(dateCurrentDay - 1);
    //     date.setHours(12);
    // }
    console.log('dia actual: ', date);

    let fecha =
        date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    console.log('fecha tomada: ', fecha);

    const dayInf = `${fecha} 06:30:00`;
    const daySup = `${fecha} 23:59:59`;

    const sqlSelectAssistance = `SELECT e.name AS NOMBRE, e.last_name AS APELLIDO, a.date_entry AS HORA_ENTRADA, a.date_egress AS HORA_SALIDA
    FROM ASSISTANCE_EMPLOYEES a 
    JOIN EMPLOYEES e ON e.dni = a.employee
    WHERE a.date_entry between "${dayInf}" AND "${daySup}"
    ORDER BY a.date_entry`;

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlSelectAssistance, (error, result) => {
                if (error) reject(error);
                console.log(result);
                resolve(result);
            });
            db.release();
        });
    });
};

module.exports = { checkInOutDB, assistanceDB, allAssistanceDB };
