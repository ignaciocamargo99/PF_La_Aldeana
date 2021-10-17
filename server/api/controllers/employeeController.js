
const { readEmployee, deleteEmployees, readCharges, createEmployee,
    modifyEmployee, createAssistanceEmployee, readEmployeeAssistance,
    deleteAssistanceEmployee, modifyAssistanceEmployee } = require('../services/employeeService');

// HTTP: GET
async function getEmployee(req, res) {
    try {
        const result = await readEmployee(req.params.dni);
        res.send(result)
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

// HTTP: GET
async function getCharges(req, res) {
    try {
        const result = await readCharges();
        res.send(result)
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

// HTTP: PUT
async function deleteEmployee(req, res) {
    try {
        await deleteEmployees(req.params.dni);
        res.json({
            Ok: true,
            Message: 'Empleado eliminado exitosamente.'
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
async function newEmployee(req, res) {
    try {
        await createEmployee(req.body);
        res.json({
            Ok: true,
            Message: 'Empleado registrado exitosamente.'
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
async function updateEmployee(req, res) {
    try {
        await modifyEmployee(req.params.dni, req.body);
        res.json({
            Ok: true,
            Message: 'Empleado actualizado exitosamente.'
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

module.exports = {
    getEmployee, deleteEmployee, getCharges, newEmployee,
    updateEmployee, newAssistanceEmployee, getEmployeeAssistance,
    deleteAssistance, updateAssistanceEmployee
}