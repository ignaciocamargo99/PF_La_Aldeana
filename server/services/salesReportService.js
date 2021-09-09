const { salesReportGetDB } = require('../models/salesReportDB');

const salesReport = async (from, to) => {
    try {
        let res = await salesReportGetDB(from, to);
        return res;
    }
    catch {
        let res = await purchasesGetDB(from, to);
        throw new Error(res);
    };
};

module.exports = { salesReport }