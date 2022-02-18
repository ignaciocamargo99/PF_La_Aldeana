const pool = require('../../config/connection');

const suppliesGetDB = () => {
    const sqlSelect = 'SELECT * FROM SUPPLIES';

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

const suppliesWithStockGetDB = () => {
    const sqlSelect = 'SELECT * FROM SUPPLIES WHERE id_supply_type != 3';

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

const suppliesStocksGetDB = () => {

    const sqlSelect = `SELECT pxs.id_product,pxs.number_supply AS quantity, s.id_supply, s.stock_unit AS stock FROM SUPPLIES s 
                        INNER JOIN PRODUCT_X_SUPPLY pxs ON s.id_supply = pxs.id_supply
                        INNER JOIN PRODUCTS p ON p.id_product = pxs.id_product 
                        WHERE s.active = 1 AND p.active = 1
                        ORDER BY p.name`

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

module.exports = { supplyPostDB, suppliesGetDB, suppliesStocksGetDB, suppliesWithStockGetDB }
