const { createSupply, readTypeSupply, readSupplies, readSuppliesWithStock, 
    modifySupply, supplyDelete } = require('../services/suppliesService');
const { isValidNumber } = require('../shared/numberValidations');
const { BAD_REQUEST } = require('../shared/httpStatusCodes');

// [HTTP:GET]
async function getSupplies(req, res) {
    try {
        const result = await readSupplies();
        res.send(result);
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        });
    }
}

// [HTTP:GET]
async function getSuppliesWithStock(req, res) {
    try {
        const result = await readSuppliesWithStock();
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
async function postSupply(req, res) {
    try {
        await createSupply(req.body);

        res.json({
            Ok: true,
            Message: 'Insumo registrado exitosamente.'
        });
    } catch (e) {
        res.json({
            Ok: false,
            Message: e.message
        });
    }
}

// HTTP: GET
async function getTypeSupplies(req, res) {
    try {
        const result = await readTypeSupply();
        res.send(result);
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        });
    }
}

// HTTP: PUT
async function updateSupply(req, res) {
    try {
        const { id } = req.params;

        if (!isValidNumber(id)) {
            res.status(BAD_REQUEST).send('ID inválido.');
        }
        await modifySupply(id, req.body);

        res.json({
            Ok: true,
            Message: 'Insumo actualizado exitosamente.'
        });
    } catch (e) {
        res.json({
            Ok: false,
            Message: e.message
        });
    }
}

// HTTP: PUT - LOGICAL DELETE
async function deleteSupply(req, res) {
    try {
        const { id } = req.params;

        if (!isValidNumber(id)) {
            res.status(BAD_REQUEST).send('ID inválido.');
        }
        await supplyDelete(id);

        res.json({
            Ok: true,
            Message: 'Insumo eliminado exitosamente.'
        });
    } catch (e) {
        res.json({
            Ok: false,
            Message: e.message
        });
    }
}

module.exports = { getSupplies, postSupply, getTypeSupplies, getSuppliesWithStock, updateSupply, deleteSupply };