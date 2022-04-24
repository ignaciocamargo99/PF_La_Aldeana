const pool = require('../../config/connection');
const bcryptjs = require('bcryptjs');

const userPostDB = async (user, permissions) => {

    const sqlSelectMaxIdUser = 'SELECT MAX(id_user) AS last_id_user FROM USERS';
    const sqlInsertUser = 'INSERT INTO USERS VALUES(?, ?, ?, ?, ?, 1)';
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

                    for (let i = 0; i < permissions.length; i++) {
                        for (let j = 0; j < permissions[i].length; j++) {
                            if (j === 0) continue;
                            else {
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
                                        else resolve();
                                    });
                                });
                                break;
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


const userUpdateDB = async (id_user, user, permissions) => {

    const { nick_user, first_name, last_name, password } = user;

    const sqlInsertUserPermissions = 'INSERT INTO USER_X_PERMISSION_X_ACCESS VALUES(?, ?, ?)';
    let sqlUpdateUser = 'UPDATE USERS SET nick_user = ?, first_name = ?, last_name = ? ';
    const sqlDeletePermission = 'DELETE FROM USER_X_PERMISSION_X_ACCESS WHERE id_user = ?';

    let dataUserToUpdate;
    if (password) {
        sqlUpdateUser += ', password = ? WHERE id_user = ?';
        let passwordHash = await bcryptjs.hash(password, 8);
        dataUserToUpdate = [nick_user, first_name, last_name, passwordHash, id_user];
    }
    else {
        sqlUpdateUser += ' WHERE id_user = ?';
        dataUserToUpdate = [nick_user, first_name, last_name, id_user];
    }

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlDeletePermission, [id_user], (error) => {
                if (error) reject(error);
            });

            db.beginTransaction((error) => {
                if (error) reject(error);
                db.query(sqlUpdateUser, dataUserToUpdate, (error) => {
                    if (error) db.rollback(() => reject(error));
                    let id_access;

                    for (let i = 0; i < permissions.length; i++) {
                        for (let j = 0; j < permissions[i].length; j++) {
                            if (j === 0) continue;
                            else {
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
                                        else resolve();
                                    });
                                });
                                break;
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


const userDeleteDB = async (id_user) => {

    let sqlUpdateUser = 'UPDATE USERS SET active = 0 WHERE id_user = ?';
    const sqlDeletePermission = 'DELETE FROM USER_X_PERMISSION_X_ACCESS WHERE id_user = ?';

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlDeletePermission, [id_user], (error) => {
                if (error) reject(error);
            });

            db.beginTransaction((error) => {
                if (error) reject(error);
                db.query(sqlUpdateUser, [id_user], (error) => {
                    if (error) db.rollback(() => reject(error));
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

module.exports = { userPostDB, userUpdateDB, userDeleteDB };