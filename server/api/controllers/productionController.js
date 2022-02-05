const { createProduction, readProduction, readProductionFlavors, updateProductionFlavors, deleteProduction } = require("../services/productionService");


// HTTP: POST
async function postProductions(req, res) {
    try {
        await createProduction(req.body);
        res.json({
            Ok: true,
            Message: 'Producción registrada exitosamente.'
        });
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

// HTTP: GET
async function getProductions(req, res) {
    try {
        const result = await readProduction();
        res.send(result);
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

// HTTP: GET:id
async function getProductionsFlavors(req, res) {
    try {
        const result = await readProductionFlavors(req.params.id_production);
        res.send(result);
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

// HTTP: UPDATE
async function updateProductionsFlavors(req, res) {
    try {
        const result = await updateProductionFlavors(req.body[0], req.body[1]);
        res.send(result);
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

// HTTP: DELETE
async function deleteProductions(req, res) {
    try {
        const result = await deleteProduction(req.params.id);
        res.send(result);
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

module.exports = { postProductions, getProductions, getProductionsFlavors, updateProductionsFlavors, deleteProductions };   