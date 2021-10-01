const pool = require('../../config/connection');

const familyFlavorGetDB = () => {
    const sqlSelect = 'SELECT id_family_flavor, name, description, active FROM FLAVOR_FAMILIES';

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

module.exports = { familyFlavorGetDB };