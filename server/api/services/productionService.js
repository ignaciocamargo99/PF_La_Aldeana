const { productionPostDB, productionGetDB } = require('../db/productionDB');

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

module.exports = { createProduction, readProduction }; 