const {
    readSalesBranches,
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

module.exports = { getSalesBranches, postSaleBranch };
