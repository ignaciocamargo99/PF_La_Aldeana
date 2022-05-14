const pool = require('../../config/connection');

const suppliesGetDB = () => {
    const sqlSelect = `SELECT s.*, st.name AS name_type_supply FROM SUPPLIES  s
                        JOIN SUPPLY_TYPES st ON st.id_supply_type = s.id_supply_type
                        WHERE s.active = 1`;

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

module.exports = { supplyPostDB, suppliesGetDB, suppliesWithStockGetDB };
