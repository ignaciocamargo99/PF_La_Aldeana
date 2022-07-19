const { getFlavorsDBByProperties } = require('../db/flavorDb');
const {
    createNewFlavors,
    deleteFlavorById,
    saveChangesToFlavor,
    searchFlavorById,
    searchFlavorsByActiveState,
    searchConsuptionsFlavors,
    searchStockFlavors
} = require('../services/flavorService');

const { genericServerError } = require('../shared/errorMessages');
const { INTERNAL_SERVER_ERROR, OK } = require('../shared/httpStatusCodes');
// HTTP: GET
async function getConsuptionsReport(req, res) {
    try {
        var from = req.query.from;
        var to = req.query.to;
        const result = await searchConsuptionsFlavors(from, to);
        res.send(result);
    } catch (e) {
        res.json({
            Ok: false,
            Message: genericServerError
        });
    };
};
// HTTP: GET /api/stockFlavorsReport
async function getStockFlavorsReport(req, res) {
    try {
        const result = await searchStockFlavors();
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

async function getFlavors(req, res) {
    try {
        const flavors = await getFlavorsDBByProperties(req.query);
        const result = {
            amount: flavors.length,
            flavors: flavors,
        };
        res.status(OK).send(result);
    } catch (e) {
        res.status(INTERNAL_SERVER_ERROR).send({ error: genericServerError });
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

module.exports = {
    deleteFlavor,
    getActiveFlavors,
    getSingleFlavor,
    postFlavors,
    updateFlavor,
    getFlavors,
    getStockFlavorsReport,
    getConsuptionsReport
};
