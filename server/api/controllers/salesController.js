const { readPayTypes, createSale, readProductXSupply } = require('../services/salesService');

async function getPayTypes(req, res) {
    try {
        const result = await readPayTypes();
        res.send(result)
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: 'No se pudo acceder a los tipos de pago.'
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

module.exports = { getPayTypes, postSale, getProductXSupply }