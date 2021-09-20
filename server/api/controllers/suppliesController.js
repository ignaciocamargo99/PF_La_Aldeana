const { createSupply } = require('../services/suppliesService')
const db = require("../../config/connection");

// [HTTP:GET]
async function getSupplies(req, res) {

    const sqlSelect = `SELECT s.id_supply, s.name, s.stock_lot FROM SUPPLIES s`;

    await db.query(sqlSelect, (err, result) => {
        if (err) throw err;
        else res.send(result);
    })
};

// HTTP: POST
async function postSupply(req, res) {
    try {
        await createSupply(req.body);

        res.json({
            Ok: true,
            Message: 'Insumo registrado exitosamente.'
        });
    } catch (e) {
        res.json({
            Ok: false,
            Message: e.message
        });
    };
};

module.exports = { getSupplies, postSupply };