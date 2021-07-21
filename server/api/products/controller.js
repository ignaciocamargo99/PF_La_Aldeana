const db = require("../../config/connection");

// HTTP: POST
async function postProduct(req, res) {
    const { body } = req;

    const name = body.name;
    const description = body.description;
    const price = body.price;
    const id_sector = body.id_sector;
    const id_product_type = body.id_product_type;

    const sqlInsert = "INSERT INTO PRODUCTS(name, description, price, id_sector, id_product_type) VALUES(?,?,?,?,?)"

    await db.query(sqlInsert, [name, description, price, id_sector, id_product_type], (error, result) => {
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
