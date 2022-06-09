const pool = require('../../config/connection');

const nonWorkingDayGenerationDB = () => {
    const today = new Date();
    let initMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    let initMonthString = `${initMonth.getFullYear()}${
        initMonth.getMonth() > 8
            ? initMonth.getMonth() + 1
            : '0' + (initMonth.getMonth() + 1)
    }01`;
    let finishMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    let finishMonthString = `${finishMonth.getFullYear()}${
        finishMonth.getMonth() > 8
            ? finishMonth.getMonth() + 1
            : '0' + (finishMonth.getMonth() + 1)
    }${
        finishMonth.getDate() > 9
            ? finishMonth.getDate()
            : '0' + finishMonth.getDate()
    }`;

    // console.log('initMonth ', initMonth);
    // console.log('initMonthString ', initMonthString);
    // console.log('finishMonth ', finishMonth);
    // console.log('finishMonthString ', finishMonthString);

    const sqlSelectLastNonWorkingDays = `SELECT id_day_off, dni_employee, date
            FROM DAYS_OFF d
            WHERE id_day_off = (SELECT MAX(id_day_off) 
                FROM DAYS_OFF o WHERE d.dni_employee = o.dni_employee)`;

    // const sqlSelectLastNonWorkingDays = `
    //     SELECT d.id_day_off, d.dni_employee, MAX(d.date) AS date , cXe.id_charge AS charge
    //         FROM DAYS_OFF d INNER JOIN CHARGES_X_EMPLOYEES cXe ON d.dni_employee = cXe.dni_employee
    //         WHERE date BETWEEN '${initMonthString}' AND '${finishMonthString}'
    //         GROUP BY dni_employee
    //         ORDER BY date DESC`;

    let employees;

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject('0:' + error);

            db.query(sqlSelectLastNonWorkingDays, (error, rows) => {
                if (error) reject('1:' + error);
                else {
                    employees = rows;
                    console.log(employees);
                }
            });

            db.beginTransaction((error) => {
                if (error) reject('1,5:' + error);

                let gap;

                for (let i = 0; i < employees.length; i++) {
                    gap = employees[i].charge === 4 ? 6 : 7;
                    let date = new Date(employees[i].date);
                    let finishDate = new Date(
                        date.getFullYear(),
                        date.getMonth() + 2,
                        0
                    );
                    let dateString;
                    let sqlInsertNonworkingDays;
                    date.setDate(date.getDate() + gap);
                    while (date.getTime() >= finishDate.getTime()) {
                        console.log('pasa por el while', employees[i].charge);
                        let postDate = new Date(date.getTime());
                        postDate.setDate(postDate.getDate() + 1);
                        dateString = `${date.getFullYear()}${
                            date.getMonth() > 8
                                ? date.getMonth() + 1
                                : '0' + (date.getMonth() + 1)
                        }${
                            date.getDate() > 9
                                ? date.getDate()
                                : '0' + date.getDate()
                        }`;
                        let postDateString = `${postDate.getFullYear()}${
                            postDate.getMonth() > 8
                                ? postDate.getMonth() + 1
                                : '0' + (postDate.getMonth() + 1)
                        }${
                            postDate.getDate() > 9
                                ? postDate.getDate()
                                : '0' + postDate.getDate()
                        }`;
                        sqlInsertNonworkingDays = `INSERT INTO DAYS_OFF (dni_employee, date) VALUES(${employees[i].dni_employee},${dateString})`;

                        db.query(sqlInsertNonworkingDays, (error) => {
                            if (error) {
                                return db.rollback(() => reject('2:' + error));
                            }
                        });
                        sqlInsertNonworkingDays = `INSERT INTO DAYS_OFF (dni_employee, date) VALUES (${employees[i].dni_employee},${postDateString})`;
                        db.query(sqlInsertNonworkingDays, (error) => {
                            if (error) {
                                return db.rollback(() => reject('3:' + error));
                            }
                        });
                        date.setDate(date.getDate() + (gap + 1));
                    }
                }

                db.commit((error) => {
                    if (error) {
                        return db.rollback(() => reject('4:' + error));
                    } else resolve();
                });
            });
            db.release();
        });
    });
};

module.exports = { nonWorkingDayGenerationDB };
