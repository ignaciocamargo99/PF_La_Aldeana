const { jdEmployeeGetDB, jdEmployeeCreateDB, jdEmployeeUpdateDB } = require('../db/jdEmployeeDB');

const readJDEmployee = async (params) => {
    try {
        let res = await jdEmployeeGetDB(params);
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

module.exports = { readJDEmployee , createJDEmployee, modifyJDEmployee}