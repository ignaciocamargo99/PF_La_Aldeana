const { readJDEmployee, createJDEmployee, modifyJDEmployee, removeJDEmployee, readJDEmployeeInDate, removeSchedule } = require('../services/jdEmployeeService')

// [HTTP:GET]
async function getJDEmployee(req, res) {
    try {
        const result = await readJDEmployee(req.query);
        res.send(result)
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
};

// [HTTP:GET]
async function getJDEmployeeInDate(req, res) {
    try {
        const result = await readJDEmployeeInDate(req.query);
        res.send(result)
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
};

// HTTP: POST
async function postJDEmployee(req, res) {
    try {
        await createJDEmployee(req.body);
        res.json({
            Ok: true,
            Message: 'Jordana cargada exitosamente.'
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
async function updateJDEmployee(req, res) {
    try {
        await modifyJDEmployee(req.body);
        res.json({
            Ok: true,
            Message: 'Dia laboral modificado exitosamente.'
        })
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

// HTTP: DELETE
async function deleteJDEmployee(req, res) {
    try {
        await removeJDEmployee(req.query);
        res.json({
            Ok: true,
            Message: 'Dia laboral eliminado exitosamente.'
        })
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

// HTTP: DELETE
async function deleteSchedule(req, res) {
    try {
        await removeSchedule(req.query);
        res.json({
            Ok: true,
            Message: 'Grilla eliminada exitosamente.'
        })
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

module.exports = { getJDEmployee, postJDEmployee, updateJDEmployee, deleteJDEmployee, getJDEmployeeInDate, deleteSchedule };