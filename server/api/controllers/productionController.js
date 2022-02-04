const { createProduction, readProduction, readProductionFlavors } = require("../services/productionService");


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
async function getProductions(req, res){
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
async function getProductionsFlavors(req, res){
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

module.exports = { postProductions, getProductions, getProductionsFlavors };   