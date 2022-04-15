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
    
    const sqlSelect = "SELECT u.nick_user, u.first_name, u.last_name, u.password, u.active " + 
    "FROM USERS u " + 
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

module.exports = { logInDB, getUserDB }