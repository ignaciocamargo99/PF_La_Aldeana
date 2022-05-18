const pool = require('../../config/connection');

const productTypeGetDB = () => {
    const sqlSelect = 'SELECT id_product_type, name, id_sector FROM PRODUCT_TYPES';

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

const typeProductPostDB = (newTypeProduct) => {

    const sqlInsert = "INSERT INTO PRODUCT_TYPES VALUES(null, ?, ?, ?, ?)"
    const { name, description, id_sector, send_delivery } = newTypeProduct;

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlInsert, [name, description, id_sector, send_delivery], (error) => {
                if (error) reject(error);
                else resolve();
            });
            db.release();
        })
    });
};

module.exports = { productTypeGetDB, typeProductPostDB };