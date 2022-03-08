const { franchisePostDB, franchiseGetDB, franchisePutDB, franchiseDeleteDB } = require('../db/franchiseDB');

const readFranchises = async () => {
    try {
        let res = await franchiseGetDB();
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};

const createFranchise = async (newFranchise) => {
    try {
        let res = await franchisePostDB(newFranchise);
        return res;
    }
    catch (error) {
        throw Error(error)
    }
};

const modifyFranchise = async (idFranchise, franchise) => {
    try {
        let res = await franchisePutDB(idFranchise, franchise);
        return res;
    }
    catch (error) {
        throw Error(error)
    }
};

const deleteFranchise = async (franchiseDeleteID) => {
    try {
        let res = await franchiseDeleteDB(franchiseDeleteID);
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};

module.exports = { createFranchise, readFranchises, modifyFranchise, deleteFranchise }