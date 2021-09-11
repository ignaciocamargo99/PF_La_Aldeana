const { createProduction } = require("./service");

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

module.exports = { postProductions };   