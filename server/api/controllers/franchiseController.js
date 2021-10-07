const { createFranchise, readFranchises } = require('../services/franchiseService')

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
            Message: e.message
        });
    };
};

// HTTP: GET
async function getFranchises(req, res) {
    try {
        const result = await readFranchises();
        res.send(result)
    } catch (e) {
        res.json({
            Ok: false,
            Message: e.message
        });
    };
};

module.exports = { postFranchise, getFranchises };