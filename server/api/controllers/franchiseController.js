const { createFranchise, readFranchises, modifyFranchise, deleteFranchise } = require('../services/franchiseService')

// HTTP: POST
async function postFranchise(req, res) {
    try {
        await createFranchise(req.body);

        res.json({
            Ok: true,
            Message: 'Franquicia registrada exitosamente.'
        });
    } catch (e) {
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

// HTTP: PUT
async function updateFranchise(req, res) {
    try {
        await modifyFranchise(req.params.id, req.body);

        res.json({
            Ok: true,
            Message: 'Franquicia editada exitosamente.'
        });
    } catch (e) {
        res.json({
            Ok: false,
            Message: e.message
        });
    };
};

// HTTP: DELETE
async function deleteFranchises(req, res) {
    try {
        await deleteFranchise(req.params.id);
        res.json({
            Ok: true,
            Message: 'Franquicia eliminada exitosamente.'
        });
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}


module.exports = { postFranchise, getFranchises, updateFranchise, deleteFranchises };