const { readProduct, createProduct, readImageProduct, deleteProduct, updateProduct, readProductSupply, readProductStocks, readProductXSupply } = require('../services/productService');

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

// HTTP: POST
async function postProduct(req, res) {
    try {
        await createProduct(req.body, req.file);

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

// HTTP: DELETE
async function deleteProducts(req, res) {
    try {
        await deleteProduct(req.params.id);
        res.json({
            Ok: true,
            Message: 'Producto eliminado exitosamente.'
        });
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

// HTTP: PUT
async function updateProducts(req, res) {
    try {
        await updateProduct(req.params.id, req.body, req.file, req.body.flagImageUpdate);
        res.json({
            Ok: true,
            Message: 'Producto actualizado exitosamente.'
        });
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

// HTTP: GET :id
async function getImage(req, res) {
    try {
        const result = await readImageProduct(req.params.id);
        res.send(result)
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

// HTTP: GET
async function getProductStocks(req, res) {
    try {
        const result = await readProductStocks();
        res.send(result)
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

module.exports = { getProduct, postProduct, deleteProducts, updateProducts, getImage, getProductSupply, getProductStocks, getProductXSupply }
