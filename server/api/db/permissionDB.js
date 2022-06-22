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

module.exports = { permissionsGetDB, permissionsUserGetDB, viewsGetDB, accessesGetDB };