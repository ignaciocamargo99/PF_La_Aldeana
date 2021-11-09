const { employeeGetDB, employeeDeleteDB, chargeGetDB, employeeCreateDB, employeeUpdateDB, dniEmployeeGetDB, employeeForDesktopGetDB } = require('../db/employeeDb');

const readEmployee = async (dni) => {
    try {
        let res = await employeeGetDB(dni);
        return res;
    }
    catch(error) {
        throw Error(error)
    };
};

const readEmployeeForDesktop = async () => {
    try {
        let res = await employeeForDesktopGetDB();
        return res;
    }
    catch(error) {
        throw Error(error)
    };
};

const readEmployeebyDni = async (dniEmployee) => {
    try {
        let res = await dniEmployeeGetDB(dniEmployee);
        return res;
    }
    catch(error) {
        throw Error(error)
    };
};

const readCharges = async () => {
    try {
        let res = await chargeGetDB();
        return res;
    }
    catch(error){
        throw Error(error)
    };
};

const deleteEmployees = async (dniEmployee) => {
    try {
        let res = await employeeDeleteDB(dniEmployee);
        return res;
    }
    catch(error){
        throw Error(error)
    };
};

const createEmployee = async (newEmployee) => {
    try {
        let res = await employeeCreateDB(newEmployee);
        return res;
    }
    catch(error) {
        throw Error(error);
    };
};

const modifyEmployee = async (dniEmployee, updateEmployee) => {
    try {
        let res = await employeeUpdateDB(dniEmployee, updateEmployee);
        return res;
    }
    catch(error) {
        throw Error(error);
    };
};

module.exports = { readEmployee, deleteEmployees, readCharges, createEmployee, modifyEmployee, readEmployeebyDni, readEmployeeForDesktop };