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
        });
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
        });
    });
};

const supplyPostDB = (newSupply) => {
    const sqlInsert = 'INSERT INTO SUPPLIES VALUES(?,?,?,?,?,?,?,?,?,?)';

    const { name, description, id_supply_type, price_wholesale, price_retail, stock_lot, stock_unit, unit_x_lot } = newSupply;

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);
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

const supplyUpdateDB = (id, supply) => {
    const { name, description, id_supply_type, price_wholesale, price_retail, stock_lot, stock_unit, unit_x_lot } = supply;

    const sqlUpdateSupply =
        `UPDATE SUPPLIES s SET s.name = ?, s.description = ?, s.id_supply_type = ?, s.price_wholesale = ?, s.price_retail = ?,
    s.stock_lot = ?, s.stock_unit = ?, s.unit_x_lot = ?
    WHERE s.id_supply = ?`;


    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);
            db.query(sqlUpdateSupply, [
                name,
                description,
                id_supply_type,
                price_wholesale,
                price_retail,
                stock_lot,
                stock_unit,
                unit_x_lot,
                id
            ], (error) => {
                if (error) reject();
                resolve();
            });
            db.release();
        });
    });
};

module.exports = { supplyPostDB, suppliesGetDB, suppliesWithStockGetDB, supplyUpdateDB };
