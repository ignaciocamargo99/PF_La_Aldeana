const { readFlavor, readTypeFlavor, searchFlavorsByActiveState, searchFlavorById } = require('../services/flavorService');
const { genericServerError } = require('../shared/errorMessages');

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

// HTTP: GET /api/flavors
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
            Message: genericServerError,
        })
    }
}

// HTTP: GET /api/flavors/:idFlavor
async function getSingleFlavor(req, res) {
    try {
        const { idFlavor } = req.params;
        const result = await searchFlavorById(idFlavor);
        res.json({
            Ok: true,
            Data: result,
        })
    }
    catch (e) {
        res.json({
            Ok: false,
            Data: [],
            Message: genericServerError,
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

module.exports = { getTypeFlavor, getFlavor, getActiveFlavors, getSingleFlavor }