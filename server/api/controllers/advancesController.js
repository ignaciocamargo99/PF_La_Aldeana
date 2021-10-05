const { readAdvances, deleteAdvance, createAdvances, modifyAdvances } = require('../services/advancesService');

// HTTP: GET
async function getAdvances(req, res) {
    try {
        const result = await readAdvances();
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
async function deleteAdvances(req, res) { 
    try {
        await deleteAdvance(req.params.dni);
        res.json({
            Ok: true,
            Message: 'Adelanto eliminado exitosamente.'
        })
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

// HTTP: POST
async function newAdvances(req, res) {
    try {
        await createAdvances(req.body);
        res.json({
            Ok: true,
            Message: 'Adelanto registrado exitosamente.'
        })
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

// HTTP: UPDATE
async function updateAdvances(req, res) {
    try {
        await modifyAdvances(req.params.dni, req.body);
        res.json({
            Ok: true,
            Message: 'Adelanto actualizado exitosamente.'
        })
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

module.exports = { getAdvances, deleteAdvances, newAdvances, updateAdvances }