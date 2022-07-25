const { readPayTypes, createSale, createSaleDelivery, readOnSiteSales } = require('../services/salesService');

async function getPayTypes(req, res) {
    try {
        const result = await readPayTypes();
        res.send(result)
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message
        })
    }
}

async function getOnSiteSales(req, res) {
    try {
        const result = await readOnSiteSales(req.query.day);
        res.send(result)
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message
        })
    }
}

// HTTP: POST
async function postSale(req, res) {
    try {
        const newSaleId =await createSale(req.body);
        res.json({
            Ok: true,
            Message: 'Venta registrada exitosamente.',
            saleId: newSaleId,
        });
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

// HTTP: POST
async function postSaleDelivery(req, res) {
    try {
        await createSaleDelivery(req.body);
        res.json({
            Ok: true,
            Message: 'Venta registrada exitosamente.'
        });
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

module.exports = { getPayTypes, postSale, postSaleDelivery, getOnSiteSales }