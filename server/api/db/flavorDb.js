
const pool = require('../../config/connection');

const flavorGetDB = () => {
    const sqlSelect = 'SELECT * FROM FLAVORS';

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


module.exports = { flavorGetDB, typeFlavorGetDB, familyFlavorGetDB};

