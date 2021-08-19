
const pool = require('../../config/connection');

const flavorGetDB = (id_type_flavor, id_family_flavor) => {
    const sqlSelect =
        'SELECT f.id_flavor, f.name, ft.id_type_flavor, ft.name AS `name_type_flavor`, fm.id_family_flavor, fm.name AS `name_family_flavor` ' +
        'FROM FLAVORS f ' +
        'JOIN FLAVOR_TYPES ft ON f.type_flavor = ft.id_type_flavor ' +
        'JOIN FLAVOR_FAMILIES fm ON f.family_flavor = fm.id_family_flavor ' +
        'WHERE ft.id_type_flavor = ? AND fm.id_family_flavor = ?';

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlSelect, [id_type_flavor, id_family_flavor], (error, result) => {
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


module.exports = { flavorGetDB, typeFlavorGetDB, familyFlavorGetDB };

