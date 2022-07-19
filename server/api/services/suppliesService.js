const { supplyPostDB, suppliesGetDB, suppliesWithStockGetDB, supplyUpdateDB, supplyDeleteDB, suppliesStocksGetDB, suppliesUpdateStockDB } = require('../db/suppliesDB');
const { getSupplyTypesRepository } = require('../db/supplyTypeRepository.js');

const readSupplies = async () => {
    try {
        let res = await suppliesGetDB();
        return res;
    }
    catch (error) {
        throw Error(error);
    }
};

const readSuppliesWithStock = async () => {
    try {
        let res = await suppliesWithStockGetDB();
        return res;
    }
    catch (error) {
        throw Error(error);
    }
};

const createSupply = async (newSupply) => {
    try {
        await supplyPostDB(newSupply);
    }
    catch (error) {
        throw Error(error);
    }
};

const readTypeSupply = async () => {
    try {
        let res = await getSupplyTypesRepository();

        return res;
    }
    catch (error) {
        throw Error(error);
    }
};

const modifySupply = async (id, supply) => {
    try {
        await supplyUpdateDB(id, supply);
    }
    catch (error) {
        throw Error(error);
    }
};

const modifySupplyStock = async (supplies) => {
    try {
        await suppliesUpdateStockDB(supplies);
    }
    catch (error) {
        throw Error(error);
    }
};

const supplyDelete = async (id) => {
    try {
        await supplyDeleteDB(id);
    }
    catch (error) {
        throw Error(error);
    }
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

module.exports = {
    createSupply, readTypeSupply, readSupplies, readSuppliesWithStock,
    modifySupply, supplyDelete, modifySupplyStock, readSuppliesStocks
};
