
const pool = require('../../config/connection');


const typeFlavorGetDB = () => {
    const sqlSelect = 'SELECT id_type_flavor, name FROM FLAVOR_TYPES';

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

const flavorsGetDB = () => {
    const sqlSelect = 'SELECT id_flavor, name, family_flavor, stock FROM FLAVORS WHERE stock > 0 ORDER BY name';

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


const familyFlavorGetDB = () => {
    const sqlSelect = 'SELECT id_family_flavor, name FROM FLAVOR_FAMILIES';

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


module.exports = { flavorsGetDB, typeFlavorGetDB, familyFlavorGetDB, chamberFlavorsDispatchPostDB };

