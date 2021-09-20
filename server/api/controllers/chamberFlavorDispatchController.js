const { createChamberFlavorsDispatch } = require('../services/chamberFlavorDispatchService');

// HTTP: POST TRANSACTION
async function postChamberFlavors(req, res) {
    try {
        await createChamberFlavorsDispatch(req.body);
        res.json({
            Ok: true,
            Message: 'La salida de helados de cámara se registró exitosamente'
        })
    }
    catch (e) {
        res.sendStatus(500)
    }
}

module.exports = { postChamberFlavors }