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

module.exports = { permissionsGetDB, permissionsRolGetDB };