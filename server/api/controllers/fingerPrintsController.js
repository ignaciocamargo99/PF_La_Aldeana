const { createFingerPrint } = require('../services/fingerPrintsService');

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

module.exports = { newFingerPrint };