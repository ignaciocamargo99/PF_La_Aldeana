const {
    createNewFlavors,
    deleteFlavorById,
    readFlavor,
    readTypeFlavor,
    saveChangesToFlavor,
    searchFlavorById,
    searchFlavorsByActiveState,
} = require('../services/flavorService');

const { genericServerError } = require('../shared/errorMessages');

// HTTP: GET
async function getFlavor(req, res) {
    try {
        const result = await readFlavor();
        res.send(result);
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        });
    }
}

// HTTP: GET /api/flavors
async function getActiveFlavors(req, res) {
    try {
        const result = await searchFlavorsByActiveState(true);
        res.json({
            Ok: true,
            Data: result,
        });
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: genericServerError,
        });
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
        });
    }
    catch (e) {
        res.json({
            Ok: false,
            Data: [],
            Message: genericServerError,
        });
    }
}

// HTTP: POST /api/flavors
async function postFlavors(req, res) {
    try {
        const result = await createNewFlavors(req.body);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(500).send({ error: genericServerError });
    }
}

// HTTP: PUT /api/flavors/:idFlavor
async function updateFlavor(req, res) {
    try {
        const { idFlavor } = req.params;
        const result = await saveChangesToFlavor(idFlavor, req.body);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(500).send({ error: genericServerError });
    }
}

// HTTP: DELETE /api/flavors/:idFlavor
async function deleteFlavor(req, res) {
    try {
        const { idFlavor } = req.params;
        const result = await deleteFlavorById(idFlavor);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(500).send({ error: genericServerError });
    }
}

// HTTP: GET
async function getTypeFlavor(req, res) {
    try {
        const result = await readTypeFlavor();
        res.send(result);
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        });
    }
}

module.exports = {
    deleteFlavor,
    getActiveFlavors,
    getFlavor,
    getSingleFlavor,
    getTypeFlavor,
    postFlavors,
    updateFlavor,
};
