const { readTypeProduct, createTypeProduct, deleteProductTypeByID } = require('../services/typeProductService');
const { genericServerError } = require('../shared/errorMessages');
const {
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
    OK,
} = require('../shared/httpStatusCodes');
const { isValidNumber } = require('../shared/numberValidations');

// HTTP: GET
async function getTypeProduct(req, res) {
    try {
        const result = await readTypeProduct();
        res.send(result);
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        });
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
        });
    }
}


// HTTP: DELETE
async function deleteProductType(req, res) {
    try {
        const { id } = req.params;
        if (!isValidNumber(id)) res.status(BAD_REQUEST).send('ID inválido.');

        await deleteProductTypeByID(id);
        res.status(OK).send('Producto eliminado');
    }
    catch (e) {
        res.status(INTERNAL_SERVER_ERROR).send({ error: genericServerError });
    }
}

module.exports = { getTypeProduct, postTypeProduct, deleteProductType };