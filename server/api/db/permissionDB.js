const pool = require("../../config/connection");

const permissionsGetDB = () => {
    const sqlSelect = 'SELECT * FROM PERMISSIONS';

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

const permissionsUserGetDB = (nick_user) => {

    const sqlSelect = `SELECT upa.*, p.name, a.name_access FROM USER_X_PERMISSION_X_ACCESS upa 
                        JOIN USERS u ON u.id_user = upa.id_user
                        JOIN PERMISSIONS p ON upa.id_permission = p.id_permission
                        JOIN ACCESSES a ON upa.id_access = a.id_access
                        WHERE u.nick_user = ?`;

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlSelect, [nick_user], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            db.release();
        })
    });
};

const viewsGetDB = () => {
    const sqlSelect = `SELECT upa.*, p.name FROM USER_X_PERMISSION_X_ACCESS upa
                        JOIN PERMISSIONS p ON p.id_permission = upa.id_permission`;

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

const permissionRolUpdateDB = (permissions) => {
    const sqlUpdate1 = `UPDATE ROL_X_PERMISSION SET active = ? WHERE id_rol = 2 
                        AND id_permission = ? AND id_access = ?`;

    const sqlUpdate2 = `UPDATE ROL_X_PERMISSION SET active = ? WHERE id_rol = 2 
                        AND id_permission = ? AND id_access BETWEEN 1 AND 4`;

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.beginTransaction((err) => {
                if (error) reject(error);

                // Recorre fila 0, 1, 2, 3, 4, 5, 6 y 7
                for (let i = 0; i < permissions.length; i++) {
                    // Recorre columna 0, 1, 2, 3 y 4
                    for (let j = 0; j < permissions[i].length; j++) {
                        // Deshabilitar los 4 permisos --> 0
                        if (permissions[i][0]) {
                            db.query(sqlUpdate2, [permissions[i][0], i + 1], (error) => {
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
                        }

                        else {
                            db.query(sqlUpdate1, [permissions[i][j], i + 1, j], (error) => {
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
                        }


                        //     // Registrar --> 1
                        //     if (permissions[i][1]) {
                        //         db.query(sqlUpdate1, [permissions[i][1], i + 1, 1], (error) => {
                        //             if (error) {
                        //                 return db.rollback(() => reject(error));
                        //             }
                        //             db.commit((error) => {
                        //                 if (error) {
                        //                     return db.rollback(() => reject(error));
                        //                 }
                        //                 else resolve();
                        //             });
                        //         })
                        //     }
                        //     // Ver --> 2
                        //     if (permissions[i][2]) {
                        //         db.query(sqlUpdate1, [permissions[i][2], i + 1, 2], (error) => {
                        //             if (error) {
                        //                 return db.rollback(() => reject(error));
                        //             }
                        //             db.commit((error) => {
                        //                 if (error) {
                        //                     return db.rollback(() => reject(error));
                        //                 }
                        //                 else resolve();
                        //             });
                        //         })
                        //     }
                        //     // Editar --> 3
                        //     if (permissions[i][3]) {
                        //         db.query(sqlUpdate1, [permissions[i][3], i + 1, 3], (error) => {
                        //             if (error) {
                        //                 return db.rollback(() => reject(error));
                        //             }
                        //             db.commit((error) => {
                        //                 if (error) {
                        //                     return db.rollback(() => reject(error));
                        //                 }
                        //                 else resolve();
                        //             });
                        //         })
                        //     }
                        //     // Eliminar --> 4
                        //     if (permissions[i][4]) {
                        //         db.query(sqlUpdate1, [permissions[i][4], i + 1, 4], (error) => {
                        //             if (error) {
                        //                 return db.rollback(() => reject(error));
                        //             }
                        //             db.commit((error) => {
                        //                 if (error) {
                        //                     return db.rollback(() => reject(error));
                        //                 }
                        //                 else resolve();
                        //             });
                        //         })
                        //     }

                        // }
                    };
                };


                db.commit((error) => {
                    if (error) {
                        return db.rollback(() => reject(error));
                    }
                    else resolve();
                });
                db.release();
            });
        });
    });
};

const accessesGetDB = () => {
    const sqlSelect = 'SELECT * FROM ACCESSES';

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

module.exports = { permissionsGetDB, permissionsUserGetDB, viewsGetDB, permissionRolUpdateDB, accessesGetDB };