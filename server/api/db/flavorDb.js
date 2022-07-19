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

const consuptionsReportGetDB = (from, to) => {

    const sqlSelect = `SELECT sb.date, f.name, dsf.quantity, f.id_flavor, ft.name AS type, ff.name AS family FROM SALES_BRANCHES sb 
                LEFT JOIN DETAIL_SALES_FLAVORS dsf ON dsf.id_sale_branch = sb.id_sale_branch 
                LEFT JOIN FLAVORS f ON dsf.id_flavor = f.id_flavor
                LEFT JOIN FLAVOR_FAMILIES ff ON ff.id_family_flavor = f.family_flavor
                LEFT JOIN FLAVOR_TYPES ft ON ft.id_type_flavor = f.type_flavor` +
                "WHERE sb.date >= '" + (from.length > 7 ? from : (from + '-01')) + "' AND sb.date <= '" + (to.length > 7 ? to : (to + '-01')) + "' AND sb.status = 'FINISH'";

    const sqlSelect2 = `SELECT sb.date_dispatch AS date, f.id_flavor, f.name, dsf.amount AS quantity, ft.name AS type, ff.name AS family FROM CHAMBER_FLAVORS_DISPATCH sb
                LEFT JOIN FLAVORS f ON sb.id_flavor = f.id_flavor 
                LEFT JOIN FLAVOR_FAMILIES ff ON ff.id_family_flavor = f.family_flavor
                LEFT JOIN FLAVOR_TYPES ft ON ft.id_type_flavor = f.type_flavor` +
                "WHERE sb.date_dispatch >= '" + (from.length > 7 ? from : (from + '-01')) + "' AND sb.date_dispatch <= '" + (to.length > 7 ? to : (to + '-01')) ;

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.beginTransaction((error) => {
                if (error) reject(error);
                db.query(sqlSelect, (error, result) => {
                    if (error) reject(error);
                    else {
                        let res = [];
                        let totals = [
                            {id: 'Baldes producidos', quantity: 0},
                            {id: 'Baldes consumidos', quantity: 0},
                        ];
                        if (result.length === 0) resolve({res, totals: totals});
                        
                        db.query(sqlSelect2, (error, resul) => {
                            if (error) {
                                console.log(error);
                                db.rollback(()=> reject(error));
                            }
                            else {
                                if (resul.length === 0) resolve({res, totals: totals});
                                result?.map(detail => {
                                    let aux = res.findIndex(element => element.id === detail.id_flavor);
                                    if (aux === -1) {
                                        res.push({id: detail.id_flavor, type: detail.type, family: detail.family, consum: detail.quantity, prod: 0});
                                        totals[1].quantity += detail.quantity;
                                    } else {
                                        res[aux].consum += detail.quantity;
                                        totals[1].quantity += detail.quantity;
                                    }
                                });
                                resul?.map(detail => {
                                    let aux = res.findIndex(element => element.id === detail.id_flavor);
                                    if (aux === -1) {
                                        res.push({id: detail.id_flavor, type: detail.type, family: detail.family, consum: 0, prod: detail.quantity});
                                        totals[0].quantity += detail.quantity;
                                    } else {
                                        res[aux].prod += detail.quantity;
                                        totals[0].quantity += detail.quantity;
                                    }
                                });

                                db.commit((error) => {
                                    if (error) {
                                        console.log(error);
                                        return db.rollback(() => reject(error));
                                    }
                                    else resolve({res, totals: totals});
                                });
                            }
                        });
                    }
                });
            });
            db.release();
        });
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
    getStockFlavorsDB,
    consuptionsReportGetDB
};