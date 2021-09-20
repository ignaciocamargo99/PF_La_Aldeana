const { supplyPostDB } = require('../db/suppliesDB');

const createSupply = async (newSupply) => {
    try {
        await supplyPostDB(newSupply);
    }
    catch (error){
        throw Error(error)
    };
};

module.exports = { createSupply }