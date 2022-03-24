const bcryptjs = require('bcryptjs');

const pool = require('../../config/connection');

const logInDB = (user) => {
    
    const sqlSelect = "SELECT password " + 
    "FROM USERS " + 
    "WHERE nick_user = ?";
    
    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlSelect, [user], (err, result) => {
                if (err) {
                    reject(err);
                } else resolve(result);
            });

            db.release();
        });
    })
}
const getUserDB = (user) => {
    
    const sqlSelect = "SELECT u.nick_user, u.first_name, u.last_name, u.password, r.name as Rol, u.id_rol as rol_ID " + 
    "FROM USERS u " + 
    "INNER JOIN ROLES r ON u.id_rol = r.id_rol " + 
    "WHERE u.nick_user = ?";
    
    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlSelect, [user], (err, result) => {
                if (err) {
                    reject(err);
                } else resolve(result);
            });

            db.release();
        });
    })
}

 
const loginDesktop = (login) => {
    const {user, password} = login;

    const sqlSelect = "SELECT password " + 
    "FROM USERS " + 
    "WHERE nick_user = ?";

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);
            db.query(sqlSelect, [user], (err, result) => {
                if (err) reject(err);

                // comparar las claves y devolver true o false
                const compare = bcryptjs.compareSync(password, result.password)
                if (compare) resolve(true);
                else resolve(false);
            });

            db.release();
        });
    })
}

module.exports = { logInDB, getUserDB, loginDesktop }