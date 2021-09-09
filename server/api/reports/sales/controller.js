const { salesReport } = require('../../../services/salesReportService')

// HTTP: GET
async function getSalesReport(req, res) {
    try {

        var from = req.query.from
        var to = req.query.to
        const result = await salesReport(from, to)
        
        res.send(result)
    } catch (e) {
        res.json({
            Ok: false,
            Message: 'No se pudo encontrar datos de ventas guardados.'
        });
    };
};

module.exports = { getSalesReport };