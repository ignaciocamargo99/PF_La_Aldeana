const { salesReportGetDB } = require('../models/salesReportDB');

const salesReport = async () => {
    try {
        let res = await salesReportGetDB();
        return res;
    }
    catch {
        let res = await purchasesGetDB();
        throw new Error(res);
    };
};

module.exports = { salesReport }