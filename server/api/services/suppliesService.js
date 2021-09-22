const { supplyPostDB, typeSupplyGetDB } = require('../db/suppliesDB');

const createSupply = async (newSupply) => {
    try {
        await supplyPostDB(newSupply);
    }
    catch (error){
        throw Error(error)
    };
};

const readTypeSupply = async () => {
    try {
        let res = await typeSupplyGetDB();
        return res;
    }
    catch (error) {
        throw Error(error);
    };
};

module.exports = { createSupply, readTypeSupply }