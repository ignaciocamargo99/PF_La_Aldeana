const { salesReportGetDB } = require('../db/salesReportDB');

const readSalesReport = async (from, to) => {
    try {
        let res = await salesReportGetDB(from, to);
        return res;
    }
    catch (error){
        throw new Error(error);
    };
};

module.exports = { readSalesReport }