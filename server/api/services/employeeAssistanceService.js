
const { assistanceEmployeeCreateDB, employeeAssistanceGetDB,
    assistanceDeleteDB, employeeAssistanceUpdateDB, allEmployeeAssistancesGetDB } = require('../db/employeeAssistanceDb');


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


const readAllEmployeeAssistance = async () => {
    try {
        let res = await allEmployeeAssistancesGetDB();
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};

module.exports = {
    createAssistanceEmployee, readEmployeeAssistance,
    deleteAssistanceEmployee, modifyAssistanceEmployee, readAllEmployeeAssistance
};