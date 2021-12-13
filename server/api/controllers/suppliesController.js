const { createSupply, readTypeSupply, readSupplies, readSuppliesStocks , readSuppliesWithStock } = require('../services/suppliesService')
const db = require("../../config/connection");

// [HTTP:GET]
async function getSupplies(req, res) {
    try {
        const result = await readSupplies();
        res.send(result)
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
};

// [HTTP:GET]
async function getSuppliesWithStock(req, res) {
    try {
        const result = await readSuppliesWithStock();
        res.send(result)
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
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

// HTTP: GET
async function getTypeSupplies(req, res) {
    try {
        const result = await readTypeSupply();
        res.send(result)
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

// HTTP: GET
async function getSuppliesStocks(req, res) {
    try {
        const result = await readSuppliesStocks();
        res.send(result)
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

module.exports = { getSupplies, postSupply, getTypeSupplies, getSuppliesStocks, getSuppliesWithStock };
