const { createFingerPrint, readFingerPrints, readFingerByDni } = require('../services/fingerPrintsService');

// HTTP: GET
async function getFingerPrints(req, res) {
    try {
        const result = await readFingerPrints();
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
async function getFingersByDni(req, res) {
    try {
        const result = await readFingerByDni(req.params.dni);
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
async function newFingerPrint(req, res) {
    try {
        await createFingerPrint(req.body);
        res.json({
            Ok: true,
            Message: 'Huella registrada exitosamente.'
        })
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

module.exports = { newFingerPrint, getFingerPrints, getFingersByDni };