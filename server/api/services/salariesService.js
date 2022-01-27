const { salariesGetDB, hsWorkedGetDB, bonusGetDB } = require('../db/salariesDB');

const readSalaries = async (monthYear) => {
    try {
        let res = await salariesGetDB(monthYear);
        return res;
    }
    catch (error){
        throw new Error(error);
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

module.exports = { readSalaries, readHSWorked, readBonus };