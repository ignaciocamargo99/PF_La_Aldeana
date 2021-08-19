
const {readFlavor, readTypeFlavor, readFamilyFlavor} = require('../services/flavorService');

// HTTP: GET
async function getFlavor(req, res) {
    try {
        const result = await readFlavor(req.query.type_flavor, req.query.family_flavor);

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


module.exports = { getFlavor, getTypeFlavor, getFamilyFlavor }