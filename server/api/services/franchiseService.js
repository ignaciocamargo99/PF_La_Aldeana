const { franchisePostDB, franchiseGetDB } = require('../db/franchiseDB');

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



module.exports = { createFranchise, readFranchises }