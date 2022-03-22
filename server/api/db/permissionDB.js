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

const permissionsRolGetDB = (rol) => {

    const sqlSelect = "SELECT p.name FROM ROL_X_PERMISSION rp INNER JOIN PERMISSIONS p ON rp.id_permission=p.id_permission WHERE rp.id_rol= ?";

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlSelect, [rol], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            db.release();
        })
    });
};

const viewsGetDB = () => {
    const sqlSelect = `SELECT rp.*, p.name FROM ROL_X_PERMISSION rp
                        JOIN PERMISSIONS p ON p.id_permission = rp.id_permission
                        WHERE rp.id_rol = 2`;

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

module.exports = { permissionsGetDB, permissionsRolGetDB, viewsGetDB };