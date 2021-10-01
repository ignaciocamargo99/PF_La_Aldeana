const { readPayTypes, createSale } = require('../services/salesService');

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

module.exports = { getPayTypes, postSale }