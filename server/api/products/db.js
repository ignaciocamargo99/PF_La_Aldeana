const pool = require('../../config/connection');
const path = require('path');
const fs = require('fs');


const productGetDB = () => {
    const sqlSelect = 'SELECT id_product, name, description, price, id_sector, id_product_type, active FROM PRODUCTS ' +
        'WHERE active = 1';

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

const productAllGetDB = () => {
    const sqlSelect = 'SELECT p.id_product AS id_product, p.name AS name, p.description AS description, p.price AS price, ' +
        'p.id_sector AS id_sector, s.name AS name_sector, p.id_product_type AS id_product_type, pt.name AS name_product_type, p.active AS active ' +
            'FROM PRODUCTS p ' +
            'INNER JOIN SECTORS s ON p.id_sector = s.id_sector ' +
            'INNER JOIN PRODUCT_TYPES pt ON p.id_product_type = pt.id_product_type ' +
            'WHERE active = 1';

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
    const sqlSelect = 'SELECT * FROM PRODUCT_TYPES';

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


const productPostDB = (newProduct, imageProduct) => {

    const sqlInsert = 'INSERT INTO PRODUCTS VALUES(?,?,?,?,?,?,?,?)';
    let image = imageProduct;
    const { name, description, price, id_sector, id_product_type } = newProduct;

    if (image) image = fs.readFileSync(path.join(__dirname, './images/' + image.filename));
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

    if (image) image = fs.readFileSync(path.join(__dirname, './images/' + image.filename));
    else image = null;

    const selectMaxIdProduct = 'SELECT MAX(id_product) AS last_id_product FROM PRODUCTS';
    const sqlInsertProducts = 'INSERT INTO PRODUCTS VALUES(?,?,?,?,?,?,?,?)';
    const sqlInsertProductsSupplies = 'INSERT INTO PRODUCT_X_SUPPLY VALUES(?,?,?)';

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);
            db.query(selectMaxIdProduct, (error, row) => {
                if (error) reject(error);
                else id_product = row[0].last_id_product + 1;
            })
            db.beginTransaction((error) => {
                if (error) reject(error);

                db.query(sqlInsertProducts, [null, name, description, image, price, id_sector, id_product_type, 1], (error, result) => {
                    if (error) {
                        return db.rollback(() => reject(error))
                    }
                    for (let i = 0; i < arrSupplies.length; i++) {
                        db.query(sqlInsertProductsSupplies, [id_product, arrSupplies[i].id_supply, arrSupplies[i].amount], (error) => {
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
                    if (img.image && img.id_product) fs.writeFileSync(path.join(__dirname, './dbImages/' + img.id_product + '-product.png'), img.image);
                })
                const imagedir = fs.readdirSync(path.join(__dirname, `./dbImages/`));
                const imagedirFilter = imagedir.filter((valor) => valor === `${productID}-product.png`);
                resolve(imagedirFilter);
            });
            db.release();
        })
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


const supplyGetDB = () => {
    const sqlSelect = "SELECT id_supply, name, description FROM SUPPLIES ORDER BY name"

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

    const sqlInsert = "INSERT INTO PRODUCT_TYPES (name, description) VALUES (?, ?)"
    const { name, description } = newTypeProduct;

    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlInsert, [name, description], (error) => {
                if (error) reject(error);
                else resolve();
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


const productUpdateDB = (productUpdate, imageUpdate, flagImage) => {

    const { id_product, name, description, price, id_sector, id_product_type } = productUpdate;
    let image = imageUpdate;
    let valuesToUpdate = [];
    let sqlInsert = "";

    if (image) image = fs.readFileSync(path.join(__dirname, './images/' + image.filename));
    else image = null;

    // Check if the image is modified from the front ...
    if (flagImage == 'true') {
        sqlInsert = 'UPDATE PRODUCTS p SET p.name = ?, p.description = ?, p.image = ?, p.price = ?, p.id_sector = ?, p.id_product_type = ? WHERE p.id_product = ?';
        valuesToUpdate = [name, description, image, price, id_sector, id_product_type, id_product]
    }
    else {
        sqlInsert = 'UPDATE PRODUCTS p SET p.name = ?, p.description = ?, p.price = ?, p.id_sector = ?, p.id_product_type = ? WHERE p.id_product = ?';
        valuesToUpdate = [name, description, price, id_sector, id_product_type, id_product]
    }
    return new Promise((resolve, reject) => {
        pool.getConnection((error, db) => {
            if (error) reject(error);

            db.query(sqlInsert, valuesToUpdate, (error) => {
                if (error) reject(error);
                else resolve();
            });
            db.release();
        })
    });
};


const productSupplyUpdateDB = (productUpdate, imageUpdate, flagImage) => {
    const { id_product, name, description, price, id_sector, id_product_type, supplies } = productUpdate;
    let arrSupplies = JSON.parse(supplies);
    let image = imageUpdate;
    let valuesToUpdate = [];
    let sqlInsert = "";

    if (image) image = fs.readFileSync(path.join(__dirname, './images/' + image.filename));
    else image = null;

    // Check if the image is modified from the front ...
    if (flagImage == 'true') {
        sqlInsert = 'UPDATE PRODUCTS p SET p.name = ?, p.description = ?, p.image = ?, p.price = ?, p.id_sector = ?, p.id_product_type = ? WHERE p.id_product = ?';
        valuesToUpdate = [name, description, image, price, id_sector, id_product_type, id_product]
    }
    else {
        sqlInsert = 'UPDATE PRODUCTS p SET p.name = ?, p.description = ?, p.price = ?, p.id_sector = ?, p.id_product_type = ? WHERE p.id_product = ?';
        valuesToUpdate = [name, description, price, id_sector, id_product_type, id_product]
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
                        for (let i = 0; i < arrSupplies.length; i++) {
                            db.query(sqlInsertProductSupply, [id_product, arrSupplies[i].id_supply, arrSupplies[i].amount], (error) => {
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
                    })
                })
                db.release();
            });
        })
    });
};


module.exports = {
    productGetDB, productTypeGetDB, productSupplyGetDB, productSupplyUpdateDB,
    productPostDB, productSupplyPostDB, imageProductGetDB, typeSupplyGetDB,
    supplyGetDB, typeProductPostDB, productDeleteDB, productUpdateDB, productAllGetDB
};