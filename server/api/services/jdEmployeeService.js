const { jdEmployeeGetDB, jdEmployeeCreateDB, jdEmployeeUpdateDB, jdEmployeeDeleteDB, jdEmployeeInDateGetDB, scheduleDeleteDB } = require('../db/jdEmployeeDB');

const readJDEmployee = async (params) => {
    try {
        let res = await jdEmployeeGetDB(params);
        return res;
    }
    catch (error){
        throw Error(error)
    };
};

const readJDEmployeeInDate = async (params) => {
    try {
        let res = await jdEmployeeInDateGetDB(params);
        return res;
    }
    catch (error){
        throw Error(error)
    };
};

const createJDEmployee = async (newJDEmployee) => {
    try {
        let res = await jdEmployeeCreateDB(newJDEmployee);
        return res;
    }
    catch (error) {
        throw Error(error);
    };
};

const modifyJDEmployee = async (updateJDEmployee) => {
    try {
        let res = await jdEmployeeUpdateDB(updateJDEmployee);
        return res;
    }
    catch (error) {
        throw Error(error);
    };
};

const removeJDEmployee = async (jdToDelete) => {
    try {
        let res = await jdEmployeeDeleteDB(jdToDelete);
        return res;
    }
    catch (error) {
        throw Error(error);
    };
};

const removeSchedule = async (dates) => {
    try {
        let res = await scheduleDeleteDB(dates);
        return res;
    }
    catch (error) {
        throw Error(error);
    };
};

module.exports = { readJDEmployee , createJDEmployee, modifyJDEmployee, removeJDEmployee, readJDEmployeeInDate, removeSchedule}