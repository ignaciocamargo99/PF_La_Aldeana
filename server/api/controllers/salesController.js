const { readPayTypes, createSale, createSaleDelivery ,readProductXSupply } = require('../services/salesService');

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

// HTTP: POST
async function postSale(req, res) {
    try {
        await createSale(req.body);
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

async function getProductXSupply(req, res) {
    try {
        const result = await readProductXSupply();
        res.send(result)
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: 'No se pudo acceder a la tabla.'
        })
    }
}

module.exports = { getPayTypes, postSale, postSaleDelivery , getProductXSupply }