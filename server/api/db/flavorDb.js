const Flavor = require('../database/models/flavor');
const FlavorFamily = require('../database/models/flavorFamily');
const FlavorType = require('../database/models/flavorType');
const pool = require('../../config/connection');

const getFlavorsDBByActiveState = (onlyActiveFlavors) => {
    return Flavor.findAll({
        where: {
            active: onlyActiveFlavors
        },
        include: [FlavorFamily, FlavorType]
    });
};
const getStockFlavorsDB = () => {
    const sqlSelect = `SELECT f.name, f.description, f.stock, f.reorder_stock, ft.name AS type, ff.name AS family FROM FLAVORS f
                        LEFT JOIN FLAVOR_FAMILIES ff ON ff.id_family_flavor = f.family_flavor
                        LEFT JOIN FLAVOR_TYPES ft ON ft.id_type_flavor = f.type_flavor
                        WHERE f.active = true ORDER BY f.name DESC`;

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);
            db.query(sqlSelect, (error, result) => {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    let res = [
                        {id: 'Sin stock', list: [], totals: [
                            {id: 'Stock', quantity: 0},
                            {id: 'Reorden', quantity: 0},
                        ]},
                        {id: 'Stock menor o igual al punto de reorden', list: [], totals: [
                            {id: 'Stock', quantity: 0},
                            {id: 'Reorden', quantity: 0},
                        ]},
                        {id: 'Stock mayor al punto de reorden', list: [], totals: [
                            {id: 'Stock', quantity: 0},
                            {id: 'Reorden', quantity: 0},
                        ]},
                    ];
                    let totals = [
                        {id: 'Sin stock', quantity: 0},
                        {id: 'Stock menor o igual al punto de reorden', quantity: 0},
                        {id: 'Stock mayor al punto de reorden', quantity: 0},
                    ];
                    
                    if (result.length === 0) resolve({res, totals: totals});
                    
                    result?.forEach(flavor => {
                        if (flavor.stock === 0) {
                            totals[0].quantity ++;
                            res[0].list.push(flavor);
                            res[0].totals[0].quantity += flavor.stock;
                            res[0].totals[1].quantity += flavor.reorder_stock;
                        }else {
                            if (flavor.stock <= flavor.reorder_stock) {
                                totals[1].quantity ++;
                                res[1].list.push(flavor);
                                res[1].totals[0].quantity += flavor.stock;
                                res[1].totals[1].quantity += flavor.reorder_stock;
                            }else {
                                totals[2].quantity ++;
                                res[2].list.push(flavor);
                                res[2].totals[0].quantity += flavor.stock;
                                res[2].totals[1].quantity += flavor.reorder_stock;
                            }
                        }
                    });

                    resolve({res, totals: totals});
                }
            });
            db.release();
        });
    });
};

const getFlavorsDBByProperties = ({ active, idFlavorType }) => {
    let whereCondition = {};

    if (active !== undefined) {
        whereCondition.active = active === 'true' ? true : false;
    }
    if (idFlavorType !== undefined) {
        whereCondition.type_flavor = +idFlavorType;
    }

    return Flavor.findAll({
        where: whereCondition
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

const saveFlavorDB = (flavorData) => {
    const {
        description,
        flavorFamilyId,
        flavorTypeId,
        name,
        reorderStock,
        stock,
    } = flavorData;

    return Flavor.create({
        description: description,
        family_flavor: flavorFamilyId,
        name: name,
        reorderStock: reorderStock,
        stock: stock,
        type_flavor: flavorTypeId,
    });
};

module.exports = {
    getFlavorsDBByActiveState,
    getFlavorDBById,
    saveFlavorDB,
    getFlavorsDBByProperties,
    getStockFlavorsDB
};