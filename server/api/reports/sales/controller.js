const { salesReport } = require('../../../services/salesReportService')

// HTTP: GET
async function getSalesReport(req, res) {
    try {
        const result = await salesReport(req.params.dates)
        
        res.send(result)
    } catch (e) {
        res.json({
            Ok: false,
            Message: 'No se pudo encontrar datos de ventas guardados.'
        });
    };
};

module.exports = { getSalesReport };