const { readSalaries, readHSWorked, readBonus, createSalaries } = require('../services/salariesService');

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

// HTTP: POST
async function newSalaries(req, res) {
    try {
        await createSalaries(req.body);
        res.json({
            Ok: true,
            Message: 'Salario registrado exitosamente.'
        })
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

// HTTP: GET
async function getHSWorked(req, res) {
    try {
        var monthYear = req.query.monthYear;
        var dni = req.query.dni;
        var nonWorkingDays = JSON.parse(req.query.nonWorkingDays);
        const result = await readHSWorked(monthYear, dni, nonWorkingDays);
        res.send(result);
    } catch (e) {
        res.json({
            Ok: false,
            Message: 'No se pudo encontrar datos de horas trabajadas para el empleado y mes seleccionados.'
        });
    };
};

// HTTP: GET
async function getBonus(req, res) {
    try {
        var monthYear = req.query.monthYear;
        var dni = req.query.dni;
        const result = await readBonus(monthYear, dni);
        res.send(result);
    } catch (e) {
        res.json({
            Ok: false,
            Message: 'No se pudo encontrar datos de salarios suficientes para calcular el aguinaldo del empleado seleccionado.'
        });
    };
};

module.exports = { getSalaries, getHSWorked, getBonus, newSalaries };