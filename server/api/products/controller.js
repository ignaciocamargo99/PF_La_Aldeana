
const db = require("../../config/connection");

// HTTP: GET 
async function getTypeProducts(req, res) {

    const sqlSelect = "SELECT id_product_type, name FROM PRODUCT_TYPES"

    await db.query(sqlSelect, (err, result) => {
        if(err) throw err;
        else res.send(result);
    })
}

// HTTP: GET 
async function getSupplies(req, res) {

    const sqlSelect = "SELECT id_supply, name FROM SUPPLIES"

    await db.query(sqlSelect, (err, result) => {
        if(err) throw err;
        else res.send(result);
    })
}

module.exports = { getTypeProducts, getSupplies };
