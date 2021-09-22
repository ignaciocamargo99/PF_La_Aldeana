const pool = require('../../config/connection');

const supplyPostDB = (newSupply) => {
    const sqlInsert = 'INSERT INTO SUPPLIES VALUES(?,?,?,?,?,?,?,?,?,?)';

    const { name, description, id_supply_type, price_wholesale, price_retail, stock_lot, stock_unit, unit_x_lot } = newSupply;

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            db.query(sqlInsert, [
                null,
                name,
                description,
                id_supply_type,
                price_wholesale,
                price_retail,
                stock_lot,
                stock_unit,
                unit_x_lot,
                1
            ], (error) => {
                if (error) reject();

                resolve();
            });
            db.release();
        });
    });
};

const typeSupplyGetDB = () => {
    const sqlSelect = "SELECT id_supply_type, name FROM SUPPLY_TYPES";

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

module.exports = { supplyPostDB, typeSupplyGetDB }