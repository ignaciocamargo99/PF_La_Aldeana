const { salariesGetDB, hsWorkedGetDB, bonusGetDB, salariesCreateDB, salaryGetDB, salariesUpdateDB, detailsGetDB, conceptsGetDB } = require('../db/salariesDB');

const readSalaries = async (monthYear) => {
    try {
        let res = await salariesGetDB(monthYear);
        return res;
    }
    catch (error){
        throw new Error(error);
    };
};

const readConcepts = async () => {
    try {
        let res = await conceptsGetDB();
        return res;
    }
    catch (error){
        throw new Error(error);
    };
};

const readDetails = async (id) => {
    try {
        let res = await detailsGetDB(id);
        return res;
    }
    catch (error){
        throw new Error(error);
    };
};

const readSalary = async (monthYear, dni) => {
    try {
        let res = await salaryGetDB(monthYear, dni);
        return res;
    }
    catch (error){
        throw new Error(error);
    };
};

const createSalaries = async (newSalary) => {
    try {
        let res = await salariesCreateDB(newSalary);
        return res;
    }
    catch(error) {
        throw Error(error);
    };
};

const modifySalaries = async (id, newSalary) => {
    try {
        let res = await salariesUpdateDB(id, newSalary);
        return res;
    }
    catch(error) {
        throw Error(error);
    };
};

const readHSWorked = async (monthYear, dni, nonWorkingDays) => {
    try {
        let res = await hsWorkedGetDB(monthYear, dni, nonWorkingDays);
        return res;
    }
    catch (error){
        throw new Error(error);
    };
};

const readBonus = async (monthYear, dni) => {
    try {
        let res = await bonusGetDB(monthYear, dni);
        return res;
    }
    catch (error){
        throw new Error(error);
    };
};

module.exports = { readSalaries, readHSWorked, readBonus, createSalaries, readSalary, modifySalaries, readDetails, readConcepts };