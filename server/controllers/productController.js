const { readProduct, readTypeProduct, readProductSupply, createProduct,
    createProductSupply, readImageProduct, readTypeSupply, readSupply,
    createTypeProduct, deleteProduct, updateProduct } = require('../services/productService');

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
            Message: e.message,
        })
    }
}

// HTTP: PUT
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

module.exports = {
    getProduct, getTypeProduct, getProductSupply, postProduct,
    postProductSupply, getImage, getTypeSupplies, getSupplies,
    postTypeProduct, deleteProducts, updateProducts
}