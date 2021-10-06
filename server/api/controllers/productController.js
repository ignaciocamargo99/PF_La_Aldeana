const { readProduct, createProduct, readImageProduct, deleteProduct, updateProduct, readProductSupply,
    readTypeProduct, createProductSupply, readTypeSupply, readSupply, createTypeProduct, updateProductSupply,
    readAllProduct, readProductStocks } = require('../services/productService');

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

// HTTP: GET
async function getAllProduct(req, res) {
    try {
        const result = await readAllProduct();
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


// HTTP: GET
async function getTypeSupplies(req, res) {
    try {
        const result = await readTypeSupply();
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
async function getSupplies(req, res) {
    try {
        const result = await readSupply();
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
            Message: 'No se pudo registrar el tipo de producto.',
        })
    }
}

// HTTP: PUT TRANSACTION
async function updateProductsSupplies(req, res) {
    try {
        await updateProductSupply(req.body, req.file, req.body.flagImageUpdate);
        res.json({
            Ok: true,
            Message: 'Producto e insumos actualizados exitosamente.'
        });
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}
module.exports = { getProduct, postProduct, deleteProducts, updateProducts, getImage, getProductSupply,
    getTypeProduct, postProductSupply, getTypeSupplies, getSupplies, postTypeProduct, updateProductsSupplies,
    getAllProduct,getProductStocks }