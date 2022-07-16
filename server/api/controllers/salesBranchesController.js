const {
    readSalesBranches,
    readSalesBranchesById,
    createSalesBranches
} = require('../services/salesBranchService');

// HTTP: GET
async function getSalesBranches(req, res) {
    try {
        const result = await readSalesBranches(req.query);
        res.send(result);
    } catch (e) {
        res.json({
            Ok: false,
            Message: e.message
        });
    }
}

// HTTP: GET/id
async function getSalesBranchesByID(req, res) {
    try {
        const result = await readSalesBranchesById(req.params.id);
        res.send(result);
    } catch (e) {
        res.json({
            Ok: false,
            Message: e.message
        });
    }
}

// HTTP: POST
async function postSaleBranch(req, res) {
    try {
        await createSalesBranches(req.body);
        res.json({
            Ok: true,
            Message: 'Venta registrada exitosamente.'
        });
    } catch (e) {
        res.json({
            Ok: false,
            Message: e.message
        });
    }
}

// HTTP: PUT
// async function putSaleBranch(req, res) {
//     try {
//         await updateSalesBranches(req.params.id, req.body);
//         res.json({
//             Ok: true,
//             Message: 'Venta actualizada exitosamente.'
//         });
//     } catch (e) {
//         res.json({
//             Ok: false,
//             Message: e.message
//         });
//     }
// }

module.exports = {
    getSalesBranches,
    getSalesBranchesByID,
    postSaleBranch
};
