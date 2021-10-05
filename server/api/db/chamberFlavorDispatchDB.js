const pool = require('../../config/connection');

const chamberFlavorsDispatchPostDB = (newFlavorsToDispatch) => {
    const flavorsToDispatch = newFlavorsToDispatch;

    const sqlInsert = 'INSERT INTO CHAMBER_FLAVORS_DISPATCH VALUES(?, ?, ?, ?)';
    const sqlUpdate = 'UPDATE FLAVORS SET stock = stock - ? WHERE id_flavor = ?';

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);
            db.beginTransaction((error) => {
                if (error) reject(error);
                else {
                    for (let i = 0; i < flavorsToDispatch.length; i++) {
                        if (!flavorsToDispatch[i].date_dispatch) reject('Invalid date dispatch');
                        db.query(sqlInsert, [null, flavorsToDispatch[i].date_dispatch, flavorsToDispatch[i].id_flavor, flavorsToDispatch[i].amount], (error, result) => {
                            if (error) return db.rollback(() => reject(error));
                            else {
                                db.query(sqlUpdate, [flavorsToDispatch[i].amount, flavorsToDispatch[i].id_flavor], (error, result) => {
                                    if (error) reject(error);
                                    else {
                                        db.commit((error) => {
                                            if (error) return db.rollback(() => reject(error));
                                            else resolve();
                                        })
                                    }
                                })
                            }
                        });
                    };
                }
            });
            db.release();
        })
    });
};

module.exports = { chamberFlavorsDispatchPostDB };