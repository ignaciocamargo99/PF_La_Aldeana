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
    const sqlInsert = 'INSERT INTO SUPPLIES VALUES(?,?,?,?,?,?,?)';

    const { name, description, id_supply_type, price_wholesale, stock_unit } = newSupply;

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);
            db.query(sqlInsert, [
                null,
                name,
                description,
                id_supply_type,
                price_wholesale,
                stock_unit,
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
    const { name, description, id_supply_type, price_wholesale, stock_unit } = supply;

    const sqlUpdateSupply =
        `UPDATE SUPPLIES s SET s.name = ?, s.description = ?, s.id_supply_type = ?, s.price_wholesale = ?,
    s.stock_unit = ?
    WHERE s.id_supply = ?`;


    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);
            db.query(sqlUpdateSupply, [
                name,
                description,
                id_supply_type,
                price_wholesale,
                stock_unit,
                id
            ], (error) => {
                if (error) reject();
                resolve();
            });
            db.release();
        });
    });
};

const supplyDeleteDB = (id) => {
    const sqlDeleteProduct_X_Supply = 'DELETE FROM PRODUCT_X_SUPPLY WHERE id_supply = ?';
    const sqlDeleteSupply = 'UPDATE SUPPLIES SET active = 0 WHERE id_supply = ?';

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);
            db.beginTransaction((error) => {
                if (error) reject(error);

                db.query(sqlDeleteSupply, [id], (error) => {
                    if (error) db.rollback(() => reject(error));
                    
                    db.query(sqlDeleteProduct_X_Supply, [id], (error) => {
                        if (error) db.rollback(() => reject(error));
                        db.commit((error) => {
                            if (error) db.rollback(() => reject(error));
                            else resolve();
                        });
                    });
                });
                db.release();
            });
        });
    });
};


module.exports = { supplyPostDB, suppliesGetDB, suppliesWithStockGetDB, supplyUpdateDB, supplyDeleteDB };
