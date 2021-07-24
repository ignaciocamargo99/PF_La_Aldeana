const db = require('../../config/connection');

// HTTP: POST
async function postSupply(req, res) {
    const sqlInsert = 'INSERT INTO SUPPLIES VALUES(?,?,?,?,?,?,?,?,?,?)';

    db.query(sqlInsert, [
        null,
        req.body.name,
        req.body.description,
        req.body.imageSupply,
        req.body.id_supply_type,
        req.body.price_wholesale,
        req.body.price_retail,
        req.body.stock_lot,
        req.body.stock_unit,
        req.body.unit_x_lot
    ], (error, result) => {
        if (error) throw error;
        else res.send(result);
    })
};
/*
// HTTP: GET
async function getSupplies(req, res) {

    const sqlSelect = "SELECT id_supply, name FROM SUPPLIES"

    await db.query(sqlSelect, (err, result) => {
        if (err) throw err;
        else res.send(result);
    })
}
*/

module.exports = { postSupply };