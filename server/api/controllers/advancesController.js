const { readAdvances, readInstallments, deleteAdvance, createAdvances, modifyAdvances, readEmployee, readInstallmentsToPay, payInstallments } = require('../services/advancesService');

// HTTP: GET
async function getAdvances(req, res) {
    try {
        const result = await readAdvances();
        res.send(result);
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

// HTTP: GET
async function getInstallments(req, res) {
    try {
        var dniEmployee = req.query.dniEmployee;
        var date = req.query.date;
        const result = await readInstallments(dniEmployee, date);
        res.send(result)
    } catch (e) {
        res.json({
            Ok: false,
            Message: 'No se pudo encontrar datos de cuotas guardadas en el plan de pago del adelanto solicitado.'
        });
    };
};

// HTTP: GET
async function getInstallmentsToPay(req, res) {
    try {
        var dniEmployee = req.query.dniEmployee;
        var date = req.query.date;
        const result = await readInstallmentsToPay(dniEmployee, date);
        res.send(result)
    } catch (e) {
        res.json({
            Ok: false,
            Message: 'No se pudo encontrar datos de cuotas de adelantos para el empleado y mes solicitado.'
        });
    };
};

// HTTP: PUT
async function deleteAdvances(req, res) { 
    try {
        var dniEmployee = req.query.dniEmployee;
        var date = req.query.date;
        await deleteAdvance(dniEmployee, date);
        res.json({
            Ok: true,
            Message: 'Adelanto eliminado exitosamente.'
        })
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

// HTTP: POST
async function newAdvances(req, res) {
    try {
        await createAdvances(req.body);
        res.json({
            Ok: true,
            Message: 'Adelanto registrado exitosamente.'
        })
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

// HTTP: UPDATE
async function updateAdvances(req, res) {
    try {
        var dniEmployee = req.query.dniEmployee;
        var date = req.query.date;
        await modifyAdvances(dniEmployee, date, req.body);
        res.json({
            Ok: true,
            Message: 'Adelanto actualizado exitosamente.'
        })
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

// HTTP: UPDATE
async function updateInstallmentsToPay(req, res) {
    try {
        var dniEmployee = req.query.dniEmployee;
        var date = req.query.date;
        await payInstallments(dniEmployee, date, req.body);
        res.json({
            Ok: true,
            Message: 'Adelanto actualizado exitosamente.'
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
async function getEmployee(req, res) {
    try {
        const result = await readEmployee();
        res.send(result);
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

module.exports = { getAdvances, getInstallments, deleteAdvances, newAdvances, updateAdvances, getEmployee, getInstallmentsToPay, updateInstallmentsToPay }