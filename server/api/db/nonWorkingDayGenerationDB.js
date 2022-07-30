const pool = require('../../config/connection');

const nonWorkingDayGenerationDB = async () => {
    const today = new Date();
    let finishMonth = new Date(today.getFullYear(), today.getMonth() + 1, 20);

    const sqlSelectLastNonWorkingDays = `SELECT d.id_day_off, d.dni_employee, d.date, ce.id_charge
            FROM DAYS_OFF d
            INNER JOIN CHARGES_X_EMPLOYEES ce ON d.dni_employee = ce.dni_employee
            INNER JOIN EMPLOYEES e ON d.dni_employee = e.dni
            WHERE id_day_off = 
                (SELECT MAX(id_day_off) 
                FROM DAYS_OFF o 
                WHERE d.dni_employee = o.dni_employee) 
            AND DATE < ${convertString(finishMonth)}
            AND e.active = 1`;

    let employees;

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject('0:' + error);

            db.query(sqlSelectLastNonWorkingDays, (error, rows) => {
                if (error) reject('1:' + error);
                else {
                    employees = rows;
                    if (employees.length === 0) resolve();
                    else {
                        db.beginTransaction((error) => {
                            if (error) reject('1,5:' + error);

                            let gap;

                            for (let i = 0; i < employees.length; i++) {
                                console.log(i);
                                gap = employees[i].id_charge === 4 ? 6 : 7;

                                let date = new Date(employees[i].date);

                                let finishDate = new Date(
                                    today.getFullYear(),
                                    today.getMonth() + 3,
                                    0
                                );

                                date.setDate(date.getDate() + gap);

                                let sqlInsertNonworkingDays;

                                while (date.getTime() <= finishDate.getTime()) {
                                    sqlInsertNonworkingDays = `INSERT INTO DAYS_OFF (dni_employee, date) VALUES(${
                                        employees[i].dni_employee
                                    },${convertString(date)})`;

                                    db.query(
                                        sqlInsertNonworkingDays,
                                        (error) => {
                                            if (error) {
                                                return db.rollback(() =>
                                                    reject('2:' + error)
                                                );
                                            }
                                        }
                                    );

                                    date.setDate(date.getDate() + 1);

                                    sqlInsertNonworkingDays = `INSERT INTO DAYS_OFF (dni_employee, date) VALUES (${
                                        employees[i].dni_employee
                                    },${convertString(date)})`;

                                    db.query(
                                        sqlInsertNonworkingDays,
                                        (error) => {
                                            if (error) {
                                                return db.rollback(() =>
                                                    reject('3:' + error)
                                                );
                                            }
                                        }
                                    );
                                    date.setDate(date.getDate() + gap);
                                }
                            }

                            db.commit((error) => {
                                if (error) {
                                    return db.rollback(() =>
                                        reject('4:' + error)
                                    );
                                } else resolve();
                            });
                        });
                    }
                }
            });

            db.release();
        });
    });
};

const convertString = (date) => {
    return `'${date.getFullYear()}-${
        date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
    }-${date.getDate() > 9 ? date.getDate() : '0' + date.getDate()}'`;
};

module.exports = { nonWorkingDayGenerationDB };
