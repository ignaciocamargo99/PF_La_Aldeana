const pool = require('../../config/connection');
const Flavor = require('../database/models/flavor');
const FlavorFamily = require('../database/models/flavorFamily');
const FlavorType = require('../database/models/flavorType');

const flavorsGetDB = () => {
    const sqlSelect = 'SELECT f.id_flavor AS id_flavor, f.name AS name, f.family_flavor AS family_flavor, ff.name AS name_family_flavor, '+
     'f.stock AS stock, f.description AS description, f.type_flavor AS type_flavor, ft.name AS name_type_flavor ' +
     'FROM FLAVORS f ' +
     'INNER JOIN FLAVOR_FAMILIES ff ON f.family_flavor = ff.id_family_flavor ' +
     'INNER JOIN FLAVOR_TYPES ft ON f.type_flavor = ft.id_type_flavor ' +
     'WHERE stock > 0 ORDER BY name';

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

const getFlavorsDBByActiveState = (onlyActiveFlavors) => {
    return Flavor.findAll({
        where: {
            active: onlyActiveFlavors
        },
        include: [FlavorFamily, FlavorType]
    });
};

const getFlavorDBById = (flavorId) => {
    return Flavor.findOne({
        where: {
            idFlavor: flavorId
        },
        include: [FlavorFamily, FlavorType]
    });
};

const typeFlavorGetDB = () => {
    const sqlSelect = 'SELECT id_type_flavor, name, description FROM FLAVOR_TYPES';

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

module.exports = { flavorsGetDB, typeFlavorGetDB, getFlavorsDBByActiveState, getFlavorDBById };