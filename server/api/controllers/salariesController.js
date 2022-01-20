const { readSalaries } = require('../services/salariesService');

// HTTP: GET
async function getSalaries(req, res) {
    try {
        var monthYear = req.query.monthYear;
        const result = await readSalaries(monthYear);
        res.send(result);
    } catch (e) {
        res.json({
            Ok: false,
            Message: 'No se pudo encontrar datos de sueldos existentes para las condiciones solicitadas.'
        });
    };
};

module.exports = { getSalaries }