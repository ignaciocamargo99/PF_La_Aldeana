
const db = require("../../config/connection");

// HTTP:GET
async function getProducts(req, res) {

    const sqlSelect = "SELECT * FROM PRODUCTS";

    await db.query(sqlSelect, (err, result) => {
        if (err) throw err;
        else res.send(result);
    })
};

module.exports = { getProducts };
