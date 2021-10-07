const { employeeGetDB, employeeDeleteDB, chargeGetDB, employeeCreateDB,
    employeeUpdateDB, assistanceEmployeesGetDB, assistanceEmployeeCreateDB,
    employeeAssistanceGetDB, assistanceDeleteDB } = require('../db/employeeDb');

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

const deleteEmployees = async (dniEmployee) => {
    try {
        let res = await employeeDeleteDB(dniEmployee);
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

const modifyEmployee = async (dniEmployee, updateEmployee) => {
    try {
        let res = await employeeUpdateDB(dniEmployee, updateEmployee);
        return res;
    }
    catch (error) {
        throw Error(error);
    };
};

//#region APIs desktop NO BORRAR
const readAssistanceEmployee = async (dniEmployee) => {
    try {
        let res = await assistanceEmployeesGetDB(dniEmployee);
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};

const createAssistanceEmployee = async (newAssistance) => {
    try {
        let res = await assistanceEmployeeCreateDB(newAssistance);
        return res;
    }
    catch (error) {
        throw Error(error);
    };
};
//#endregion


const readEmployeeAssistance = async () => {
    try {
        let res = await employeeAssistanceGetDB();
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};

const deleteAssistanceEmployee = async (dniEmployee) => {
    try {
        let res = await assistanceDeleteDB(dniEmployee);
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};

module.exports = {
    readEmployee, deleteEmployees, readCharges, createEmployee,
    modifyEmployee, readAssistanceEmployee, createAssistanceEmployee,
    readEmployeeAssistance, deleteAssistanceEmployee
};