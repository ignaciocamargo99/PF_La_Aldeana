const db = require("../../config/connection");

// [HTTP:GET]
async function getSupplies(req, res) {

    const sqlSelect = `SELECT * FROM SUPPLIES`;

    await db.query(sqlSelect, (err, result) => {
        if (err) throw err;
        else res.send(result);
    })
};

module.exports = { getSupplies };