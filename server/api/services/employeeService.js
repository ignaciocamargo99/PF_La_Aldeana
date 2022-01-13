const { employeeGetDB, employeeDeleteDB, chargeGetDB, employeeCreateDB,
    employeeUpdateDB, assistanceEmployeeCreateDB, employeeAssistanceGetDB,
    assistanceDeleteDB, employeeAssistanceUpdateDB, relationshipsGetDB } = require('../db/employeeDb');

const readEmployee = async (dni) => {
    try {
        let res = await employeeGetDB(dni);
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

const readRelationships = async () => {
    try {
        let res = await relationshipsGetDB();
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


const createAssistanceEmployee = async (newAssistance) => {
    try {
        let res = await assistanceEmployeeCreateDB(newAssistance);
        return res;
    }
    catch (error) {
        throw Error(error);
    };
};


const readEmployeeAssistance = async () => {
    try {
        let res = await employeeAssistanceGetDB();
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};

const deleteAssistanceEmployee = async (dniEmployee, date_entry) => {
    try {
        let res = await assistanceDeleteDB(dniEmployee, date_entry);
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};

const modifyAssistanceEmployee = async (dniEmployee, updateAssistanceEmployee) => {
    try {
        let res = await employeeAssistanceUpdateDB(dniEmployee, updateAssistanceEmployee);
        return res;
    }
    catch (error) {
        throw Error(error);
    };
};


module.exports = {
    readEmployee, deleteEmployees, readCharges, createEmployee,
    modifyEmployee, createAssistanceEmployee, readEmployeeAssistance,
    deleteAssistanceEmployee, modifyAssistanceEmployee, readRelationships
};