const {
    readSalesBranchDB,
    readSalesBranchByIdDB,
    saveSalesBranchDB,
    putSalesBranchDB
} = require('../db/salesBranchesDB');

const readSalesBranches = async (params) => {
    try {
        let res = await readSalesBranchDB(params);
        return res;
    } catch (error) {
        throw Error(error);
    }
};

const readSalesBranchesById = async (id) => {
    try {
        let res = await readSalesBranchByIdDB(id);
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

const updateSalesBranches = async (id, body) => {
    try {
        let res = await putSalesBranchDB(id, body);
        return res;
    } catch (error) {
        throw Error(error);
    }
};

module.exports = {
    readSalesBranches,
    readSalesBranchesById,
    createSalesBranches,
    updateSalesBranches
};
