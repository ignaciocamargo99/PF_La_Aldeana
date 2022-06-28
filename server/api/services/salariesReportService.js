const { salariesReportGetDB } = require('../db/salariesReportDB');

const readSalariesReport = async (from, to) => {
    try {
        let res = await salariesReportGetDB(from, to);
        return res;
    }
    catch (error){
        throw new Error(error);
    };
};

module.exports = { readSalariesReport }