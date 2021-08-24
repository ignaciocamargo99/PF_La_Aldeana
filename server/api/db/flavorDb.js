
const pool = require('../../config/connection');

const flavorGetDB = (id_family_flavor) => {
    const sqlSelect =
        'SELECT f.id_flavor, f.name, fm.id_family_flavor, fm.name AS `name_family_flavor` ' +
        'FROM FLAVORS f ' +
        'JOIN FLAVOR_FAMILIES fm ON f.family_flavor = fm.id_family_flavor ' +
        'WHERE fm.id_family_flavor = ?';

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlSelect, [id_family_flavor], (error, result) => {
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

const flavorsGetDB = () => {
    const sqlSelect = 'SELECT id_flavor, name FROM FLAVORS';

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


module.exports = { flavorGetDB, flavorsGetDB, typeFlavorGetDB, familyFlavorGetDB };

