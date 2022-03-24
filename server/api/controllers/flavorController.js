const { readFlavor, readTypeFlavor, searchFlavorsByActiveState } = require('../services/flavorService');

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
async function getActiveFlavors(req, res) {
    try {
        const result = await searchFlavorsByActiveState(true);
        res.json({
            Ok: true,
            Data: result,
        })
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

module.exports = { getTypeFlavor, getFlavor, getActiveFlavors }