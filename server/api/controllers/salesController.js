const { readPayTypes, createSale } = require('../services/salesService');

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
        console.log(e.message)
        res.json({
            Ok: false,
            Message: 'No se pudo realizar el registro de la venta.'
        })
    }
}

module.exports = { getPayTypes, postSale }