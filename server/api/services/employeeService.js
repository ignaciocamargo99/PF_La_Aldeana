const { employeeGetDB, employeeDeleteDB, chargeGetDB } = require('../db/employeeDb');

const readEmployee = async () => {
    try {
        let res = await employeeGetDB();
        return res;
    }
    catch {
        throw Error('Error. No se han podido leer los empleados.')
    };
};

const readCharges = async () => {
    try {
        let res = await chargeGetDB();
        return res;
    }
    catch {
        throw Error('Error. No se han podido leer los cargos de empleados.')
    };
};

const deleteEmployees = async (deleteEmployee) => {
    try {
        let res = await employeeDeleteDB(deleteEmployee);
        return res;
    }
    catch {
        throw Error('Error. No se ha podido dar de baja al empleado.')
    };
};

module.exports = { readEmployee, deleteEmployees, readCharges };