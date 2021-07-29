const db = require('../../config/connection');
const multer = require('multer')
const path = require('path')
const fs = require('fs');
const diskStorage = multer.diskStorage({
    destination: path.join(__dirname, '../images'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

// HTTP: GET 
async function getProducts(req, res) {

    const sqlSelect = "SELECT  * FROM  PRODUCTS p WHERE active = 1"

    await db.query(sqlSelect, (err, result) => {
        if (err) throw err;
        else res.send(result);
    })
}

// HTTP: GET 
async function getProductsSuppliess(req, res) {

    const id_product = req.params.id;

    const sqlSelect = "SELECT * FROM PRODUCT_X_SUPPLY pxs WHERE id_product = ?"

    await db.query(sqlSelect,  [id_product], (err, result) => {
        console.log(result)
        if (err) throw err;
        else res.send(result);
    })
}

// HTTP: UPDATE 
async function deleteProduct(req, res) {

    const id_product = req.body.id_product;

    const sqlSelect = "UPDATE PRODUCTS SET active = 0 WHERE id_product = ?"

    await db.query(sqlSelect, [id_product],(err, result) => {
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

        console.log(name)
        const sqlInsert = 'UPDATE PRODUCTS p SET p.name = ?, p.description = ?, p.image = ?, p.price = ?, p.id_sector = ?, p.id_product_type = ? WHERE p.id_product = ?'
        db.query(sqlInsert, [name, description, imageProduct, price, id_sector, id_product_type, id_product], (error, result) => {
            if (error) throw error;
            else res.send(result);
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




module.exports = { postProduct, getTypeProducts, getSupplies, postTypeProducts, getTypeSupplies, getProducts, deleteProduct, getProductsSuppliess, updateProduct };
