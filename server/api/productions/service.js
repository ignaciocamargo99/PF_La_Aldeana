const { productionPostDB } = require('./db');

const createProduction = async (newProduction) => {
    try {
        await productionPostDB(newProduction);
    }
    catch {
        let res = await productionPostDB(newProduction);
        throw Error(res);
    };
};

module.exports = { createProduction }; 