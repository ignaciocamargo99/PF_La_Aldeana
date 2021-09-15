
const { readEmployee, deleteEmployees, readCharges } = require('../services/employeeService');

// HTTP: GET
async function getEmployee(req, res) {
    try {
        const result = await readEmployee();
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
        const result = await deleteEmployees(req.body);
        res.send(result)
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

module.exports = { getEmployee, deleteEmployee, getCharges }