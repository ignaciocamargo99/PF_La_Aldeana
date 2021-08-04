const db = require('../../config/connection');
const path = require('path')
const fs = require('fs');

// HTTP: GET 
async function getProducts(req, res) {

    const sqlSelect = "SELECT id_product, name, description, price, id_sector, id_product_type, active FROM PRODUCTS " +
                        "WHERE active = 1"

    await db.query(sqlSelect, (err, result) => {
        if (err) throw err;
        else {
            /*
                        result.map(product => {
                            fs.writeFileSync(path.join(__dirname,'../dbimages/' + product.id_product + '-.jpg'),product.image);
                        });
            
                        const imagenesHelados = fs.readdirSync(path.join(__dirname,'../dbimages/'));
            
                        result.map(product => {
                            product.image = 'http://localhost:3001/' + product.id_product + "-.jpg";
                        });
                        */

            res.send(result);
        }
    })
}

// HTTP: GET 
async function getProductsSuppliess(req, res) {

    const id_product = req.params.id;

    const sqlSelect = "SELECT * FROM PRODUCT_X_SUPPLY pxs WHERE id_product = ?"

    await db.query(sqlSelect, [id_product], (err, result) => {
        if (err) throw err;
        else res.send(result);
    })
}

// HTTP: UPDATE 
async function deleteProduct(req, res) {

    const id_product = req.body.id_product;

    const sqlSelect = "UPDATE PRODUCTS SET active = 0 WHERE id_product = ?"

    await db.query(sqlSelect, [id_product], (err, result) => {
        if (err) throw err;
        else res.send(result);
    })
}

// HTTP: UPDATE
async function updateProduct(req, res) {
    try {
        const id_product = req.body.id_product;
        const name = req.body.name;
        const description = req.body.description;
        const price = req.body.price;
        const id_sector = req.body.id_sector;
        const id_product_type = req.body.id_product_type;
        let imageProduct = req.file;

        if (imageProduct !== undefined) imageProduct = fs.readFileSync(path.join(__dirname, './images/' + req.file.filename))
        else imageProduct = null;


        const sqlInsert1 = 'DELETE FROM PRODUCT_X_SUPPLY WHERE id_product = ?';

        db.query(sqlInsert1, [id_product], (error, result) => {
            if (error) {
                return transaction.rollback(() => { throw error; })
            }
        })

        const sqlInsert = 'UPDATE PRODUCTS p SET p.name = ?, p.description = ?, p.image = ?, p.price = ?, p.id_sector = ?, p.id_product_type = ? WHERE p.id_product = ?';
        db.query(sqlInsert, [name, description, imageProduct, price, id_sector, id_product_type, id_product], (error, result) => {
            if (error) throw error;
            else res.send(result);
        })
    }
    catch {
        res.send("Faltan datos obligatorios o se produjo un error");
    }
};


// HTTP: UPDATE TRANSACTION
async function updateProductsSupplies(req, res) {
    try {
        const name = req.body.name;
        const description = req.body.description;
        const price = req.body.price;
        const id_sector = req.body.id_sector;
        const id_product_type = req.body.id_product_type;
        const id_product = req.body.id_product;
        let imageProduct = req.file;
        let jsonSupplies = req.body.supplies;
        let arrSupplies = JSON.parse(jsonSupplies);

        if (imageProduct !== undefined) imageProduct = fs.readFileSync(path.join(__dirname, './images/' + req.file.filename))
        else imageProduct = null;

        await db.getConnection((error, transaction) => {

            transaction.beginTransaction((error) => {
                if (error) throw error;
                const sqlInsert = 'UPDATE PRODUCTS p SET p.name = ?, p.description = ?, p.image = ?, p.price = ?, p.id_sector = ?, p.id_product_type = ? WHERE p.id_product = ?';

                transaction.query(sqlInsert, [name, description, imageProduct, price, id_sector, id_product_type, id_product], (error, result) => {
                    if (error) {
                        return transaction.rollback(() => { throw error; })
                    }

                    const sqlInsert = 'DELETE FROM PRODUCT_X_SUPPLY WHERE id_product = ?';

                    transaction.query(sqlInsert, [id_product], (error, result) => {
                        if (error) {
                            return transaction.rollback(() => { throw error; })
                        }

                        const sqlInsertProductSupply = 'INSERT INTO PRODUCT_X_SUPPLY VALUES(?,?,?)';

                        for (let i = 0; i < arrSupplies.length; i++) {
                            transaction.query(sqlInsertProductSupply, [id_product, arrSupplies[i].id_supply, arrSupplies[i].amount], (error, result) => {
                                if (error) {
                                    transaction.rollback(() => { throw error; })
                                }
                                transaction.commit((error) => {
                                    if (error) {
                                        return transaction.rollback(() => { throw error; })
                                    }
                                })
                            })
                        }
                    })
                })
            })
        })
    }
    catch {
        res.send("Faltan datos obligatorios o se produjo un error");
    }
};


// HTTP: POST
async function postProduct(req, res) {
    try {
        const name = req.body.name;
        const description = req.body.description;
        const price = req.body.price;
        const id_sector = req.body.id_sector;
        const id_product_type = req.body.id_product_type;
        let imageProduct = req.file;

        if (imageProduct !== undefined) imageProduct = fs.readFileSync(path.join(__dirname, './images/' + req.file.filename))
        else imageProduct = null;

        const sqlInsert = 'INSERT INTO PRODUCTS(name, description, image, price, id_sector, id_product_type) VALUES(?,?,?,?,?,?)'
        db.query(sqlInsert, [name, description, imageProduct, price, id_sector, id_product_type], (error, result) => {
            if (error) throw error;
            else res.send(result);
        })
    }
    catch {
        res.send("Faltan datos obligatorios o se produjo un error");
    }
};

// HTTP: GET 
async function getTypeProducts(req, res) {

    const sqlSelect = "SELECT id_product_type, name FROM PRODUCT_TYPES"

    await db.query(sqlSelect, (err, result) => {
        if (err) throw err;
        else res.send(result);
    })
}

// HTTP: GET 
async function getSupplies(req, res) {

    const sqlSelect = "SELECT * FROM SUPPLIES"

    await db.query(sqlSelect, (err, result) => {
        if (err) throw err;
        else res.send(result);
    })
}

// HTTP: POST
async function postTypeProducts(req, res) {

    const name = req.body.name;
    const description = req.body.description;

    const sqlInsert = "INSERT INTO PRODUCT_TYPES (name, description) VALUES (?, ?)"

    await db.query(sqlInsert, [name, description], (error, result) => {
        if (error) throw error;
        else res.send(result);
    })
}

// HTTP: GET 
async function getTypeSupplies(req, res) {

    const sqlSelect = "SELECT id_supply_type, name FROM SUPPLY_TYPES"

    await db.query(sqlSelect, (err, result) => {
        if (err) throw err;
        else res.send(result);
    })
}

async function getImage(req, res) {
    db.getConnection((err, conn) => {
        const id_product = req.params.id;
        if (err) return res.status(500).send('Error server');
        conn.query('SELECT * FROM PRODUCTS WHERE id_product = ?', [id_product], (err, rows) => {
            if (err) return res.status(500).send('Server error');

            rows.map(img => {
                if (img.image && img.id_product) fs.writeFileSync(path.join(__dirname, './dbImages/' + img.id_product + '-product.png'), img.image);
            })
            const imagedir = fs.readdirSync(path.join(__dirname, './dbImages/'))
            res.json(imagedir);
        })
    })
}


async function getProductsById(req, res) {
    const id_product = req.params.id;

    const sqlSelect = "SELECT * FROM PRODUCTS WHERE id_product = ?"
    await db.query(sqlSelect, [id_product], (err, result) => {
        if (err) throw err;
        else res.send(result);
    })
}


module.exports = {
    postProduct, getTypeProducts, getSupplies, postTypeProducts, getTypeSupplies, getImage,
    getProducts, deleteProduct, getProductsSuppliess, updateProduct, updateProductsSupplies, getProductsById
};
