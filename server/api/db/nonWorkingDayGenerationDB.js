const pool = require("../../config/connection");

const nonWorkingDayGenerationDB = () => {

    const today = new Date();
    let initMonth = new Date(today.getFullYear(),today.getMonth(),1);
    let initMonthString = `${initMonth.getFullYear()}${initMonth.getMonth() > 8 ? initMonth.getMonth() + 1 : '0' + (initMonth.getMonth() + 1)}01`;
    let finishMonth = new Date(today.getFullYear(),(today.getMonth()+1),1);
    let finishMonthString = `${finishMonth.getFullYear()}${finishMonth.getMonth() > 8 ? finishMonth.getMonth() + 1 : '0' + (finishMonth.getMonth() + 1)}${finishMonth.getDate() > 9 ? finishMonth.getDate() : ('0' + finishMonth.getDate())}`;

    const sqlSelectLastNonWorkingDays = `
        SELECT id_day_off, dni_employee, MAX(DATE) AS date 
            FROM DAYS_OFF 
            WHERE DATE BETWEEN '${initMonthString}' AND '${finishMonthString}' 
            GROUP BY dni_employee 
            ORDER BY DATE DESC`;

    let employees;

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject('0:' + error);

            db.query(sqlSelectLastNonWorkingDays, (error, rows) => {
                if (error) reject('1:' + error);
                else {employees = rows};
            });
            
            db.beginTransaction((error) => {
                if (error) reject('1,5:' + error);

                for(let i = 0 ; i < employees.length ; i++){
                    let date = new Date(employees[i].date);
                    let finishDate = new Date(date.getFullYear(),date.getMonth()+2,0)
                    console.log(finishDate.toDateString());
                    let dateString;
                    let sqlInsertNonworkingDays;
                    date.setDate(date.getDate() + 7);
                    while (date.getTime() <= finishDate.getTime()) {
                        let postDate = new Date(date.getTime());
                        postDate.setDate(postDate.getDate() + 1);
                        dateString = `${date.getFullYear()}${date.getMonth() > 8 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)}${date.getDate() > 9 ? date.getDate() : '0' + date.getDate()}`;
                        let postDateString = `${postDate.getFullYear()}${postDate.getMonth() > 8 ? (postDate.getMonth() + 1) : '0' + (postDate.getMonth() + 1)}${postDate.getDate() > 9 ? postDate.getDate() : '0' + postDate.getDate()}`;
                        sqlInsertNonworkingDays = `INSERT INTO DAYS_OFF (dni_employee, date) VALUES(${employees[i].dni_employee},${dateString})`;

                        db.query(sqlInsertNonworkingDays, (error) => {
                            if (error) {
                                return db.rollback(() => reject('2:' + error))
                            }
                        });
                        sqlInsertNonworkingDays = `INSERT INTO DAYS_OFF (dni_employee, date) VALUES (${employees[i].dni_employee},${postDateString})`;                        
                        db.query(sqlInsertNonworkingDays, (error) => {
                            if (error) {
                                return db.rollback(() => reject('3:' + error))
                            }
                        });
                        date.setDate(date.getDate() + 8);
                    }
                }

                db.commit((error) => {
                    if (error) {
                        return db.rollback(() => reject('4:' + error));
                    }
                    else resolve();
                });
            })
            db.release();
        })
    });
};

module.exports = { nonWorkingDayGenerationDB }