const db = require('../../config/connection');

const supplyPostDB = (newSupply) => {
    const sqlInsert = 'INSERT INTO SUPPLIES VALUES(?,?,?,?,?,?,?,?,?)';

    const { name, description, id_supply_type, price_wholesale, price_retail, stock_lot, stock_unit, unit_x_lot } = newSupply;

    return new Promise((resolve, reject) => {
        db.query(sqlInsert, [
            null,
            name,
            description,
            id_supply_type,
            price_wholesale,
            price_retail,
            stock_lot,
            stock_unit,
            unit_x_lot
        ], (error) => {
            if (error) reject();

            resolve();
        });
    })
}

module.exports = { supplyPostDB }