const { createSupply, readTypeSupply, readSupplies, readSuppliesWithStock, readSuppliesStocks,
    modifySupply, supplyDelete, modifySupplyStock } = require('../services/suppliesService');
const { isValidNumber } = require('../shared/numberValidations');
const { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } = require('../shared/httpStatusCodes');
const { genericServerError } = require('../shared/errorMessages');
const { getSuppliesDBByProperties } = require('../db/suppliesDB');

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

async function getSuppliesByProperties(req, res) {
    try {
        const supplies = await getSuppliesDBByProperties(req.query);
        const result = {
            amount: supplies.length,
            supplies: supplies,
        };
        res.status(OK).send(result);
    } catch (e) {
        res.status(INTERNAL_SERVER_ERROR).send({ error: genericServerError });
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

// HTTP: GET
async function getSuppliesStocks(req, res) {
    try {
        const result = await readSuppliesStocks();
        res.send(result)
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

// HTTP: PUT
async function updateSupplyStock(req, res) {
    try {
        await modifySupplyStock(req.body);

        res.json({
            Ok: true,
            Message: 'Stock actualizado exitosamente.'
        });
    } catch (e) {
        res.json({
            Ok: false,
            Message: e.message
        });
    }
}

module.exports = {
    getSupplies, postSupply, getTypeSupplies, getSuppliesWithStock, getSuppliesStocks,
    updateSupply, deleteSupply, updateSupplyStock, getSuppliesByProperties
};
