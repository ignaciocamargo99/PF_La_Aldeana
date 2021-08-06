const db = require('../config/connection');

const logInDB = (user) => {
    
    const sqlSelect = "SELECT u.nick_user, u.first_name, u.last_name, u.password, r.name as Rol, u.id_rol as rol_ID " + 
    "FROM USERS u " + 
    "INNER JOIN ROLES r ON u.id_rol = r.id_rol " + 
    "WHERE u.nick_user = ?";
    
    return new Promise((resolve, reject) => {
        db.query(sqlSelect, [user], (err, result) => {
            if (err) {
                reject(err);
            }

            resolve(result);
        });
    })
}

module.exports = { logInDB }
