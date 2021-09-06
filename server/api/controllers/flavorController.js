
const { readFlavor, readTypeFlavor, readFamilyFlavor, createChamberFlavorsDispatch } = require('../services/flavorService');


// HTTP: GET
async function getFlavor(req, res) {
    try {
        const result = await readFlavor();

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
async function getTypeFlavor(req, res) {
    try {
        const result = await readTypeFlavor();
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
async function getFamilyFlavor(req, res) {
    try {
        const result = await readFamilyFlavor();
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


module.exports = { getTypeFlavor, getFamilyFlavor, getFlavor, postChamberFlavors }