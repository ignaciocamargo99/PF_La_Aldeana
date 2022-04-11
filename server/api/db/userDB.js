const pool = require('../../config/connection');
const bcryptjs = require('bcryptjs');



const userPostDB = async (user, permissions) => {

    const sqlSelectMaxIdUser = 'SELECT MAX(id_user) AS last_id_user FROM USERS';
    const sqlInsertUser = 'INSERT INTO USERS VALUES(?, ?, ?, ?, ?)';
    const sqlInsertUserPermissions = 'INSERT INTO USER_X_PERMISSION_X_ACCESS VALUES(?, ?, ?)';

    const { nick_user, first_name, last_name, password } = user;

    let passwordHash = await bcryptjs.hash(password, 8);

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);
            // Get the last user id...
            let id_user;
            db.query(sqlSelectMaxIdUser, (error, row) => {
                if (error) reject(error);
                else id_user = row[0].last_id_user + 1;
            });

            db.beginTransaction((error) => {
                if (error) reject(error);
                db.query(sqlInsertUser, [null, nick_user, first_name, last_name, passwordHash], (error) => {
                    if (error) db.rollback(() => reject(error));
                    let id_access;
                    // Recorre fila 0, 1, 2, 3, 4, 5, 6 y 7
                    for (let i = 0; i < permissions.length; i++) {
                        // Recorre columna 0, 1, 2 y 3
                        for (let j = 0; j < permissions[i].length; j++) {

                            if (j === 0) continue;
                            else {
                                let flag = false;
                                if (permissions[i][1] === 1) id_access = 1;
                                else if (permissions[i][2] === 1) id_access = 2;
                                else if (permissions[i][3] === 1) id_access = 3;
                                else continue;

                                db.query(sqlInsertUserPermissions, [id_user, i + 1, id_access], (error) => {
                                    if (error) {
                                        return db.rollback(() => reject(error));
                                    }
                                    db.commit((error) => {
                                        if (error) {
                                            return db.rollback(() => reject(error));
                                        }
                                        else {
                                            flag = true;
                                            resolve();
                                        }
                                    });
                                });
                                if(flag) break;
                            }
                        }
                    }
                    db.commit((error) => {
                        if (error) {
                            return db.rollback(() => reject(error));
                        }
                        else resolve();
                    });

                });
                db.release();
            });
        });
    });
};

module.exports = { userPostDB };