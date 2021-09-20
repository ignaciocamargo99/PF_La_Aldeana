const { readProduct, createProduct, readImageProduct, deleteProduct, updateProduct } = require('../services/productService');

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

// HTTP: POST
async function deleteProducts(req, res) {
    try {
        await deleteProduct(req.body.id_product);
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
        await updateProduct(req.body, req.file, req.body.flagImageUpdate);
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

module.exports = {
    getProduct, postProduct, deleteProducts, updateProducts, getImage
}