const {
    readSalesBranchDB,
    saveSalesBranchDB
} = require('../db/salesBranchesDB');

const readSalesBranches = async (params) => {
    try {
        let res = await readSalesBranchDB(params);
        return res;
    } catch (error) {
        throw Error(error);
    }
};

const createSalesBranches = async (data) => {
    try {
        let res = await saveSalesBranchDB(data);
        return res;
    } catch (error) {
        throw Error(error);
    }
};

module.exports = { readSalesBranches, createSalesBranches };
