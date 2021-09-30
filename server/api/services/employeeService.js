const { employeeGetDB, employeeDeleteDB, chargeGetDB, employeeCreateDB, employeeUpdateDB, assistanceEmployeesGetDB } = require('../db/employeeDb');

const readEmployee = async () => {
    try {
        let res = await employeeGetDB();
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};

const readCharges = async () => {
    try {
        let res = await chargeGetDB();
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};

const deleteEmployees = async (deleteEmployee) => {
    try {
        let res = await employeeDeleteDB(deleteEmployee);
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};

const createEmployee = async (newEmployee) => {
    try {
        let res = await employeeCreateDB(newEmployee);
        return res;
    }
    catch (error) {
        throw Error(error);
    };
};

const modifyEmployee = async (updateEmployee) => {
    try {
        let res = await employeeUpdateDB(updateEmployee);
        return res;
    }
    catch (error) {
        throw Error(error);
    };
};

const readAssistanceEmployee = async () => {
    try {
        let res = await assistanceEmployeesGetDB();
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};

module.exports = { readEmployee, deleteEmployees, readCharges, createEmployee, modifyEmployee, readAssistanceEmployee };