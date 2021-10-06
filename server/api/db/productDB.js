const pool = require('../../config/connection');
const path = require('path');
const fs = require('fs');

const productGetDB = () => {
    const sqlSelect = 'SELECT p.id_product AS id_product, p.name AS name, p.description AS description, p.price AS price, ' +
        'p.id_sector AS id_sector, s.name AS name_sector, p.id_product_type AS id_product_type, pt.name AS name_product_type, p.active AS active, p.quantity_flavor AS quantity_flavor ' +
        'FROM PRODUCTS p ' +
        'INNER JOIN SECTORS s ON p.id_sector = s.id_sector ' +
        'INNER JOIN PRODUCT_TYPES pt ON p.id_product_type = pt.id_product_type ' +
        'WHERE active = 1 ORDER BY p.name';

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

const productPostDB = (newProduct, imageProduct) => {
    const { name, description, price, id_sector, id_product_type, supplies, flavor } = newProduct;

    const image = imageProduct ? fs.readFileSync(path.join(__dirname, '../images/productImages/' + imageProduct.filename)) : null;

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            const selectMaxIdProduct = 'SELECT MAX(id_product) AS last_id_product FROM PRODUCTS';

            let id_product;

            db.query(selectMaxIdProduct, (error, row) => {
                if (error) reject(error)
                else id_product = row[0].last_id_product + 1;
            });

            db.beginTransaction((error) => {
                if (error) reject(error);

                const sqlInsertProducts = 'INSERT INTO PRODUCTS VALUES(?,?,?,?,?,?,?,?,?)';

                db.query(sqlInsertProducts, [null, name, description, image, price, id_sector, id_product_type, 1, JSON.parse(flavor)], (error, result) => {
                    if (error) {
                        return db.rollback(() => reject(error))
                    };

                    const sqlInsertProductsSupplies = 'INSERT INTO PRODUCT_X_SUPPLY VALUES(?,?,?)';

                    const productSupplies = JSON.parse(supplies)

                    for (let i = 0; i < productSupplies.length; i++) {
                        db.query(sqlInsertProductsSupplies, [id_product, productSupplies[i].id_supply, productSupplies[i].number_supply], (error) => {
                            if (error) {
                                return db.rollback(() => reject(error));
                            }
                            db.commit((error) => {
                                if (error) {
                                    return db.rollback(() => reject(error));
                                }
                                else resolve();
                            });
                        });
                    };

                    db.commit((error) => {
                        if (error) {
                            return db.rollback(() => reject(error));
                        }
                        else resolve();
                    });

                });

                db.release();
            });

        });
    });
};

const imageProductGetDB = (productID) => {

    const sqlSelect = 'SELECT image, id_product FROM PRODUCTS WHERE id_product = ?';
    if (!productID) throw Error('El id del producto es null o undefined');

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlSelect, [productID], (error, result) => {
                if (error) reject(error);

                result.map(img => {
                    if (img.image && img.id_product) fs.writeFileSync(path.join(__dirname, '../images/productDBImages/' + img.id_product + '-product.png'), img.image);
                })
                const imagedir = fs.readdirSync(path.join(__dirname, `../images/productDBImages/`));
                const imagedirFilter = imagedir.filter((valor) => valor === `${productID}-product.png`);
                resolve(imagedirFilter);
            });
            db.release();
        })
    });
};

const productDeleteDB = (productDeleteID) => {

    const sqlUpdate = "UPDATE PRODUCTS SET active = 0 WHERE id_product = ?"

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlUpdate, [productDeleteID], (error) => {
                if (error) reject(error);
                else resolve();
            });
            db.release();
        })
    });
};

const productUpdateDB = (id_product, productUpdate, imageUpdate, flagImage) => {
    const { name, description, price, id_sector, id_product_type, supplies, flavor } = productUpdate;
    let arrSupplies = JSON.parse(supplies);
    let image = imageUpdate;
    let valuesToUpdate = [];
    let sqlInsert = "";

    if (image) image = fs.readFileSync(path.join(__dirname, '../images/productImages/' + image.filename));
    else image = null;

    // Check if the image is modified from the front ...
    if (flagImage == 'true') {
        sqlInsert = 'UPDATE PRODUCTS p SET p.name = ?, p.description = ?, p.image = ?, p.price = ?, p.id_sector = ?, p.id_product_type = ?, p.quantity_flavor = ? WHERE p.id_product = ?';
        valuesToUpdate = [name, description, image, price, id_sector, id_product_type, JSON.parse(flavor), id_product,]
    }
    else {
        sqlInsert = 'UPDATE PRODUCTS p SET p.name = ?, p.description = ?, p.price = ?, p.id_sector = ?, p.id_product_type = ?, p.quantity_flavor = ? WHERE p.id_product = ?';
        valuesToUpdate = [name, description, price, id_sector, id_product_type, JSON.parse(flavor), id_product,]
    }

    const sqlDelete = 'DELETE FROM PRODUCT_X_SUPPLY WHERE id_product = ?';
    const sqlInsertProductSupply = 'INSERT INTO PRODUCT_X_SUPPLY VALUES(?,?,?)';

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.beginTransaction((error) => {
                if (error) reject(error);

                db.query(sqlInsert, valuesToUpdate, (error) => {
                    if (error) {
                        return db.rollback(() => reject(error))
                    }

                    db.query(sqlDelete, [id_product], (error) => {
                        if (error) {
                            return db.rollback(() => reject(error));
                        };
                        if (arrSupplies.length > 0) {
                            for (let i = 0; i < arrSupplies.length; i++) {
                                db.query(sqlInsertProductSupply, [id_product, arrSupplies[i].id_supply, arrSupplies[i].number_supply], (error) => {
                                    if (error) {
                                        db.rollback(() => { throw error; })
                                    }
                                    db.commit((error) => {
                                        if (error) {
                                            return db.rollback(() => { throw error; })
                                        }
                                        else resolve();
                                    })
                                })
                            }
                        }
                        else {
                            db.commit((error) => {
                                if (error) {
                                    return db.rollback(() => { throw error; })
                                }
                                else resolve();
                            })
                        }
                    })
                })
                db.release();
            });
        })
    });
};

const productSupplyGetDB = (productID) => {

    const sqlSelect = 'SELECT * FROM PRODUCT_X_SUPPLY WHERE id_product = ?';

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

module.exports = { productGetDB, productPostDB, imageProductGetDB, productDeleteDB, productUpdateDB, productSupplyGetDB };