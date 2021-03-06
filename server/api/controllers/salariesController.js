const { readSalaries, readHSWorked, readBonus, createSalaries, readSalary, modifySalaries, readDetails, readConcepts } = require('../services/salariesService');

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

// HTTP: GET
async function getConcepts(req, res) {
    try {
        const result = await readConcepts();
        res.send(result);
    } catch (e) {
        res.json({
            Ok: false,
            Message: 'No se pudo encontrar datos existentes de conceptos de campos adicionales para salarios.'
        });
    };
};
// HTTP: GET
async function getDetails(req, res) {
    try {
        const result = await readDetails(req.params.id);
        res.send(result);
    } catch (e) {
        res.json({
            Ok: false,
            Message: 'No se pudo encontrar datos de detalles de sueldos existentes para las condiciones solicitadas.'
        });
    };
};

// HTTP: GET
async function getSalary(req, res) {
    try {
        var monthYear = req.query.monthYear;
        var dni = req.query.dni;
        const result = await readSalary(monthYear, dni);
        res.send(result);
    } catch (e) {
        res.json({
            Ok: false,
            Message: 'No se pudo encontrar datos de sueldos existentes para las condiciones solicitadas.'
        });
    };
};

// HTTP: POST
async function newSalary(req, res) {
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
            Message: 'Error al registrar los datos del nuevo salario.',
        })
    }
}
// HTTP: PUT
async function putSalary(req, res) {
    try {
        console.log(req.params.id, req.body)
        await modifySalaries(req.params.id, req.body);
        res.json({
            Ok: true,
            Message: 'Salario actualizada exitosamente.'
        })
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: 'Error al actualizar los datos del salario.',
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

module.exports = { getSalaries, getHSWorked, getBonus, newSalary, getSalary, putSalary, getDetails, getConcepts };