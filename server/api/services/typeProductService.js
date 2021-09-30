const { productTypeGetDB, typeProductPostDB } = require('../db/typeProductDB');

const readTypeProduct = async () => {
    try {
        let res = await productTypeGetDB();
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};

const createTypeProduct = async (newTypeProduct) => {
    try {
        let res = await typeProductPostDB(newTypeProduct);
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};

module.exports = { readTypeProduct, createTypeProduct };