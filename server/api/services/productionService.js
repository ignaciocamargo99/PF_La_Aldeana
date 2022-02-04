const { productionPostDB, productionGetDB, productionGetFlavorsDB } = require('../db/productionDB');

const createProduction = async (newProduction) => {
    try {
        let res = await productionPostDB(newProduction);
        return res;
    }
    catch (error){
        throw Error(error);
    };
};

const readProduction = async () => {
    try {
        let res = await productionGetDB();
        return res;
    }
    catch (error){
        throw Error(error);
    };
};

const readProductionFlavors = async (id_production) => {
    try {
        let res = await productionGetFlavorsDB(id_production);
        return res;
    }
    catch (error){
        throw Error(error);
    };
};

module.exports = { createProduction, readProduction, readProductionFlavors }; 