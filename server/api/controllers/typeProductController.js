const { readTypeProduct, createTypeProduct } = require('../services/typeProductService');

// HTTP: GET
async function getTypeProduct(req, res) {
    try {
        const result = await readTypeProduct();
        res.send(result)
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

// HTTP: POST
async function postTypeProduct(req, res) {
    try {
        await createTypeProduct(req.body);
        res.json({
            Ok: true,
            Message: 'Tipo de producto registrado exitosamente.'
        });
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message
        })
    }
}

module.exports = { getTypeProduct, postTypeProduct }