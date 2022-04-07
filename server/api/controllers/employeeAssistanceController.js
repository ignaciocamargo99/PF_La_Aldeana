const { createAssistanceEmployee, readEmployeeAssistance,
    deleteAssistanceEmployee, modifyAssistanceEmployee, readAllEmployeeAssistance } = require('../services/employeeAssistanceService');



// HTTP: POST
async function newAssistanceEmployee(req, res) {
    try {
        await createAssistanceEmployee(req.body);
        res.json({
            Ok: true,
            Message: 'Asistencia registrada exitosamente.'
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
async function getEmployeeAssistance(req, res) {
    try {
        const result = await readEmployeeAssistance();
        res.send(result)
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

// HTTP: DELETE
async function deleteAssistance(req, res) {
    try {
        await deleteAssistanceEmployee(req.params.dni, req.body.date_entry);
        res.json({
            Ok: true,
            Message: 'Asistencia eliminada exitosamente.'
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
async function updateAssistanceEmployee(req, res) {
    try {
        await modifyAssistanceEmployee(req.params.dni, req.body);
        res.json({
            Ok: true,
            Message: 'Asistencia actualizada exitosamente.'
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
async function getAllEmployeeAssistance(req, res) {
    try {
        const result = await readAllEmployeeAssistance();
        res.send(result)
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

module.exports = {
    newAssistanceEmployee, getEmployeeAssistance,
    deleteAssistance, updateAssistanceEmployee, getAllEmployeeAssistance
}