const { readSalariesReport } = require('../services/salariesReportService');

// HTTP: GET
async function getSalariesReport(req, res) {
    try {
        var from = req.query.from;
        var to = req.query.to;
        const result = await readSalariesReport(from, to);
        res.send(result);
    } catch (e) {
        res.json({
            Ok: false,
            Message: 'No se pudo encontrar datos de salarios guardados.'
        });
    };
};

module.exports = { getSalariesReport };