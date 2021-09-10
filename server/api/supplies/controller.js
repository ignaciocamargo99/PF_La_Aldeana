const db = require("../../config/connection");

// [HTTP:GET]
async function getSupplies(req, res) {

    const sqlSelect = `SELECT s.id_supply, s.name, s.stock_lot FROM SUPPLIES s`;
    
    await db.query(sqlSelect, (err, result) => {
        if (err) throw err;
        else res.send(result);
    })
};

module.exports = { getSupplies };