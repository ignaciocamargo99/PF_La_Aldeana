const db = require('../../config/connection');
const path = require('path')
const fs = require('fs');

// HTTP: GET 
async function getProducts(req, res) {

    const sqlSelect = "SELECT id_product, name FROM PRODUCTS"

    await db.query(sqlSelect, (err, result) => {
        if (err) throw err;
        else res.send(result);
    })
}


// HTTP: POST 
async function postProducts(req, res) {
    try {
        const name = req.body.name;
        const description = req.body.description;
        const price = req.body.price;
        const id_sector = req.body.id_sector;
        const id_product_type = req.body.id_product_type;
        let imageProduct = req.file;

        const sqlInsert = 'INSERT INTO PRODUCTS VALUES(?,?,?,?,?,?,?,?)';
        if (imageProduct !== undefined) imageProduct = fs.readFileSync(path.join(__dirname, './images/' + req.file.filename))

        else imageProduct = null;
        await db.query(sqlInsert, [null, name, description, imageProduct, price, id_sector, id_product_type, 1], (error, result) => {
            if (error) throw error;
            else res.send(result);
        })

    }
    catch {
        res.send("Faltan datos obligatorios o se produjo un error");
    }


}


// HTTP: POST TRANSACTION
async function postProductsSupplies(req, res) {
    try {
        const name = req.body.name;
        const description = req.body.description;
        const price = req.body.price;
        const id_sector = req.body.id_sector;
        const id_product_type = req.body.id_product_type;
        let id_product = 0;
        let imageProduct = req.file;
        let jsonSupplies = req.body.supplies;
        let arrSupplies = JSON.parse(jsonSupplies);

        if (imageProduct !== undefined) imageProduct = fs.readFileSync(path.join(__dirname, './images/' + req.file.filename))
        else imageProduct = null;

        await db.getConnection((error, transaction) => {

            transaction.query("SELECT MAX(id_product) AS last_id_product FROM PRODUCTS", (err, rows) => {
                if (err) return res.status(500).send('Server error')
                id_product = rows[0].last_id_product + 1;
            })
            transaction.beginTransaction((error) => {
                if (error) throw error;
                const sqlInsert = 'INSERT INTO PRODUCTS VALUES(?,?,?,?,?,?,?,?)';

                transaction.query(sqlInsert, [null, name, description, imageProduct, price, id_sector, id_product_type, 1], (error, result) => {
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

    const sqlSelect = "SELECT id_supply, name, description FROM SUPPLIES ORDER BY name"

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


module.exports = {
    postProductsSupplies, postProducts, getTypeProducts,
    getSupplies, postTypeProducts, getTypeSupplies, getProducts
};
