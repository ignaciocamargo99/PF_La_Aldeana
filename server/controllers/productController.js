const { readProduct, readTypeProduct, readProductSupply, createProduct,
    createProductSupply } = require('../services/productService');

// HTTP: GET
async function getProduct(req, res) {
    try {
        const result = await readProduct();
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

// HTTP: GET :id
async function getProductSupply(req, res) {
    try {
        const result = await readProductSupply(req.params.id);
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
async function postProduct(req, res) {
    try {
        await createProduct(req.body, req.file);
        res.json({
            Ok: true,
            Message: 'Producto registrado exitosamente.'
        });
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

// HTTP: POST TRANSACTION
async function postProductSupply(req, res) {
    try {
        await createProductSupply(req.body, req.file);
        res.json({
            Ok: true,
            Message: 'Producto e insumos registrados exitosamente.'
        });
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}


module.exports = { getProduct, getTypeProduct, getProductSupply, postProduct, postProductSupply }