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
    
    const sqlSelect = "SELECT u.nick_user, u.first_name, u.last_name, u.password " + 
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

 
const loginDesktop = (login) => {
    const {user, pass} = login;
    console.log(user, pass);
    let isLoginOk;
    let id_usuario;

    const sqlSelect = "SELECT id_user, password " + 
    "FROM USERS " + 
    "WHERE nick_user = ?";

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);
            db.query(sqlSelect, [user], (err, result) => {
                if (err) reject(err);
                
                if (result.length > 0)
                {
                    const compare = bcryptjs.compareSync(pass, result[0].password );
                    if (compare) 
                    {
                        isLoginOk=true;
                        id_usuario=result[0].id_user;

                        const sqlSelectPerm = `SELECT id_access FROM USER_X_PERMISSION_X_ACCESS 
                                                WHERE id_user=${id_usuario} AND id_permission=9`;
                        db.query(sqlSelectPerm, (err, result) => {
                            if (err) reject(err);

                            if(result.length > 0)
                            {
                                resolve({isLoginOk, permissions: result[0].id_access});
                            }
                            else
                            {
                                resolve({isLoginOk, permissions: 0});
                            }
                        });
                    }
                    else 
                    {
                        isLoginOk=false;
                        resolve({isLoginOk, permissions: -1});
                    }
                }
                else
                {
                    isLoginOk=false;
                    resolve({isLoginOk, permissions: -1});
                }
            });

            db.release();
        });
    })
}

module.exports = { logInDB, getUserDB, loginDesktop }