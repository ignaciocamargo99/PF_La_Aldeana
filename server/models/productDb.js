const pool = require('../config/connection');
const path = require('path')
const fs = require('fs');


const productGetDB = () => {
    const sqlSelect = "SELECT id_product, name, description, price, id_sector, id_product_type, active FROM PRODUCTS " +
        "WHERE active = 1";

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


const productTypeGetDB = () => {
    const sqlSelect = "SELECT id_product_type, name FROM PRODUCT_TYPES";

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


const productSupplyGetDB = (productID) => {

    const sqlSelect = "SELECT * FROM PRODUCT_X_SUPPLY WHERE id_product = ?";

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlSelect, [productID], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
            db.release();
        })
    });
};


const productPostDB = (newProduct, imageProduct) => {

    const sqlInsert = 'INSERT INTO PRODUCTS VALUES(?,?,?,?,?,?,?,?)';
    let image = imageProduct
    const { name, description, price, id_sector, id_product_type } = newProduct;

    if (image) image = fs.readFileSync(path.join(__dirname, '../api/products/images/' + image.filename));
    else image = null;

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlInsert, [null, name, description, image, price, id_sector, id_product_type, 1], (error) => {
                if (error) reject(error);
                else resolve();
            });
            db.release();
        })
    });
};


const productSupplyPostDB = (newProduct, imageProduct) => {
    const { name, description, price, id_sector, id_product_type, supplies } = newProduct;
    let id_product;
    let image = imageProduct;
    let arrSupplies = JSON.parse(supplies);

    if (image) image = fs.readFileSync(path.join(__dirname, '../api/products/images/' + image.filename));
    else image = null;

    const selectMaxIdProduct = 'SELECT MAX(id_product) AS last_id_product FROM PRODUCTS';
    const sqlInsertProducts = 'INSERT INTO PRODUCTS VALUES(?,?,?,?,?,?,?,?)';
    const sqlInsertProductsSupplies = 'INSERT INTO PRODUCT_X_SUPPLY VALUES(?,?,?)';

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);
            db.query(selectMaxIdProduct, (error, row) => {
                if(error) reject(error);
                else id_product = row[0].last_id_product + 1;
            })
            db.beginTransaction((error) => {
                if (error) reject(error);
                    
                db.query(sqlInsertProducts, [ null, name, description, image, price, id_sector, id_product_type, 1], (error, result) => {
                    if (error) {
                        return db.rollback(() => reject(error))
                    }
                    for (let i = 0; i < arrSupplies.length; i++) {
                        db.query(sqlInsertProductsSupplies, [id_product, arrSupplies[i].id_supply, arrSupplies[i].amount], (error) => {
                            if (error) {
                                return db.rollback(() => reject(error))
                            }
                            db.commit((error) => {
                                if (error) {
                                    return db.rollback(() => reject(error))
                                }
                                else resolve();
                            })
                        })
                    }
                })
                db.release();
                console.log(pool._freeConnections.indexOf(db));
            })
        })
    });
};



module.exports = { productGetDB, productTypeGetDB, productSupplyGetDB, productPostDB, productSupplyPostDB };