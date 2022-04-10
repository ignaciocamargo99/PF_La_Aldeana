const pool = require('../../config/connection');

const userPostDB = (user, permissions) => {

    const sqlInsertUser = 'INSERT INTO USERS VALUES(?, ?, ?, ?, ?)';

    const { nick_user, firs_name, last_name, password } = user;



    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlInsertUser, [name, description, id_sector], (error) => {
                if (error) reject(error);
                else resolve();
            });
            db.release();
        })
    });
};

module.exports = { userPostDB };