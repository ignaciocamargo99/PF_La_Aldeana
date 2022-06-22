const pool = require('../../config/connection');

const productTypeGetDB = () => {
    const sqlSelect = 'SELECT * FROM PRODUCT_TYPES WHERE active = 1';

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

const typeProductPostDB = (newTypeProduct) => {

    const sqlInsert = 'INSERT INTO PRODUCT_TYPES VALUES(null, ?, ?, ?, ?, 1)';
    const { name, description, id_sector, send_delivery } = newTypeProduct;

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlInsert, [name, description, id_sector, send_delivery], (error) => {
                if (error) reject(error);
                else resolve();
            });
            db.release();
        });
    });
};


const productTypeDeleteDB = (id) => {
    const sqlDeleteProductType = 'UPDATE PRODUCT_TYPES SET active = 0 WHERE id_product_type = ?';
    const sqlDeleteProducts = 'UPDATE PRODUCTS SET active = 0 WHERE id_product_type = ?';

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);
            db.beginTransaction((error) => {
                if (error) reject(error);

                db.query(sqlDeleteProducts, [id], (error) => {
                    if (error) db.rollback(() => reject(error));
                    
                    db.query(sqlDeleteProductType, [id], (error) => {
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

module.exports = { productTypeGetDB, typeProductPostDB, productTypeDeleteDB };