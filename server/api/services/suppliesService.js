const { supplyPostDB, suppliesGetDB, suppliesStocksGetDB, suppliesWithStockGetDB } = require('../db/suppliesDB');
const { getSupplyTypesRepository } = require('../db/supplyTypeRepository.js');

const readSupplies = async () => {
    try {
        let res = await suppliesGetDB();
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};

const readSuppliesWithStock = async () => {
    try {
        let res = await suppliesWithStockGetDB();
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};

const createSupply = async (newSupply) => {
    try {
        await supplyPostDB(newSupply);
    }
    catch (error) {
        throw Error(error)
    };
};

const readTypeSupply = async () => {
    try {
        let res = await getSupplyTypesRepository();

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

module.exports = { createSupply, readTypeSupply, readSupplies, readSuppliesStocks, readSuppliesWithStock }
