const { readPurchases, readLastPurchase, createPurchaseSupplies } = require('./service');

// HTTP: GET
async function getPurchases(req, res) {
    try {
        const result = await readPurchases();
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
async function getLastPurchase(req, res) {
    try {
        const result = await readLastPurchase();
        res.send(result)
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

// HTTP: POST TRANSACTION
async function postPurchaseSupplies(req, res) {
    try {
        await createPurchaseSupplies(req.body);
        res.json({
            Ok: true,
            Message: 'Compra y detalle registrados correctamente.'
        });
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

module.exports = {
    getPurchases, getLastPurchase, postPurchaseSupplies
}