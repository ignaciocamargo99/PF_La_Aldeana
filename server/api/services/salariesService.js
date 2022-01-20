const { salariesGetDB } = require('../db/salariesDB');

const readSalaries = async (monthYear) => {
    try {
        let res = await salariesGetDB(monthYear);
        return res;
    }
    catch (error){
        throw new Error(error);
    };
};

module.exports = { readSalaries };