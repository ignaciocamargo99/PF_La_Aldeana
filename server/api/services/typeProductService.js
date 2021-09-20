const { productTypeGetDB, typeProductPostDB } = require('../db/typeProductDB');

const readTypeProduct = async () => {
    try {
        let res = await productTypeGetDB();
        return res;
    }
    catch {
        let res = await productTypeGetDB();
        throw Error(res);
    };
};

const createTypeProduct = async (newTypeProduct) => {
    try {
        await typeProductPostDB(newTypeProduct);
    }
    catch {
        let res = await typeProductPostDB(newTypeProduct);
        throw Error(res);
    };
};

module.exports = { readTypeProduct, createTypeProduct };