const { readPurchases, readLastPurchase, createPurchaseSupplies, readPurchasesById } = require('../services/purchaseSuppliesService');

// HTTP: GET
async function getPurchases(req, res) {
    try {
        var from = req.query.from;
        var to = req.query.to;
        const result = await readPurchases(from, to);
        res.send(result);
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message
        })
    }
}
// HTTP: GET/id
async function getPurchasesByID(req, res) {
    try {
        const result = await readPurchasesById(req.params.id);
        res.send(result);
    } catch (e) {
        res.json({
            Ok: false,
            Message: e.message
        });
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
            Message: e.message
        })
    }
}

// HTTP: POST TRANSACTION
async function postPurchaseSupplies(req, res) {
    try {
        //console.log(req.body)
        await createPurchaseSupplies(req.body);
        res.json({
            Ok: true,
            Message: 'Compra y detalle registrados correctamente.'
        });
    }
    catch (e) {
        console.log(e.message)
        res.json({
            Ok: false,
            Message: e.message 
        })
    }
}

module.exports = { getPurchases, getLastPurchase, postPurchaseSupplies, getPurchasesByID }