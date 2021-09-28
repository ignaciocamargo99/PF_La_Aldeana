const { productionPostDB } = require('../db/productionDB');

const createProduction = async (newProduction) => {
    try {
        let res = await productionPostDB(newProduction);
        return res;
    }
    catch (error){
        throw Error(error);
    };
};

module.exports = { createProduction }; 