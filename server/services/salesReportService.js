const { salesReportGetDB } = require('../models/salesReportDB');

const salesReport = async (dates) => {
    try {
        let res = await salesReportGetDB(dates);
        return res;
    }
    catch {
        let res = await purchasesGetDB(dates);
        throw new Error(res);
    };
};

module.exports = { salesReport }