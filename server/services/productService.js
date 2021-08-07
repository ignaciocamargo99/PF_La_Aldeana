const { productGetDB, productTypeGetDB, productSupplyGetDB, productPostDB,
    productSupplyPostDB } = require('../models/productDb');

const readProduct = async () => {
    try {
        let res = await productGetDB();
        return res;
    }
    catch {
        let res = await productGetDB();
        throw Error(res);
    };
};

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

const readProductSupply = async (productID) => {
    try {
        let res = await productSupplyGetDB(productID);
        return res;
    }
    catch {
        let res = await productSupplyGetDB();
        throw Error(res);
    };
};

const createProduct = async (newProduct, imageProduct) => {
    try {
        await productPostDB(newProduct, imageProduct);
    }
    catch {
        let res = await productPostDB(newProduct, imageProduct);
        throw Error(res);
    };
};

const createProductSupply = async (newProduct, imageProduct) => {
    try {
        await productSupplyPostDB(newProduct, imageProduct);
    }
    catch {
        let res = await productSupplyPostDB(newProduct, imageProduct);
        throw Error(res);
    };
};


module.exports = { readProduct, readTypeProduct, readProductSupply, createProduct, createProductSupply };