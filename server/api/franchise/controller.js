const { createFranchise, franchises } = require('../../services/franchiseService')

// HTTP: POST
async function postFranchise(req, res) {
    try {
        await createFranchise(req.body);

        res.json({
            Ok: true,
            Message: 'Franquicia registrada exitosamente.'
        });
    } catch (e) {
        console.log(e)
        res.json({
            Ok: false,
            Message: 'No se pudo registrar la franquicia.'
        });
    };
};

// HTTP: GET
async function getFranchises(req, res) {
    try {
        await franchises();

        res.json({
            Ok: true,
            Message: 'Franquicias cargadas exitosamente.'
        });
    } catch (e) {
        res.json({
            Ok: false,
            Message: 'No se pudo encontrar franquicias.'
        });
    };
};

module.exports = { postFranchise, getFranchises };