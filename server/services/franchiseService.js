const { franchisePostDB, franchiseGetDB } = require('../models/franchiseDb');

const createFranchise = async (newFranchise) => {
    try {
        await franchisePostDB(newFranchise);
    }
    catch {
        let res = await franchisePostDB(newFranchise);
        throw new Error(res.sqlMessage);
    };
};

const franchises = async () => {
    try {
        await franchiseGetDB();
    }
    catch {
        let res = await franchiseGetDB();
        throw new Error(res.sqlMessage);
    };
};

module.exports = { createFranchise, franchises }