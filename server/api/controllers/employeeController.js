const { readEmployee, deleteEmployees, readCharges, createEmployee, readEmployeeForDesktop,
    modifyEmployee, readEmployeeByDate } = require('../services/employeeService');

// HTTP: GET
async function getEmployee(req, res) {
    try {
        const result = await readEmployee(req.params.dni);
        res.send(result);
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        });
    }
}

// HTTP: GET
async function getEmployeeByDate(req, res) {
    try {
        const result = await readEmployeeByDate(req.params.date);
        res.send(result);
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        });
    }
}

// HTTP: GET
async function getEmployeeForDesktop(req, res) {
    try {
        const result = await readEmployeeForDesktop();
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


module.exports = {
    getEmployee, deleteEmployee, getCharges, newEmployee,
    updateEmployee, getEmployeeForDesktop, getEmployeeByDate }
