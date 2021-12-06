const { supplyPostDB, typeSupplyGetDB, suppliesGetDB, suppliesStocksGetDB } = require('../db/suppliesDB');

const readSupplies = async () => {
    try {
        let res = await suppliesGetDB();
        return res;
    }
    catch (error){
        throw Error(error)
    };
};

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

const readSuppliesStocks = async () => {
    try {
        let res = await suppliesStocksGetDB();
        return res;
    }
    catch (error) {
        throw Error(error);
    };
};

module.exports = { createSupply, readTypeSupply, readSupplies, readSuppliesStocks }