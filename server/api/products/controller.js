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

// HTTP: POST
async function postProduct(req, res) {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const id_sector = req.body.id_sector;
    const id_product_type = req.body.id_product_type;
    const imageProduct = fs.readFileSync(path.join(__dirname, './images/' + req.file.filename))

    const sqlInsert = 'INSERT INTO PRODUCTS(name, description, image, price, id_sector, id_product_type) VALUES(?,?,?,?,?,?)'
    db.query(sqlInsert, [name, description, imageProduct, price, id_sector, id_product_type], (error, result) => {
        if (error) throw error;
        else res.send(result);
    })
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

    const sqlSelect = "SELECT id_supply, name FROM SUPPLIES"

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




module.exports = { postProduct, getTypeProducts, getSupplies, postTypeProducts, getTypeSupplies };
