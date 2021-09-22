const { productGetDB, productPostDB, imageProductGetDB, productDeleteDB, productUpdateDB, productSupplyGetDB } = require('../db/productDB');

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

const createProduct = async (newProduct, imageProduct) => {
    try {
        await productPostDB(newProduct, imageProduct);
    }
    catch {
        let res = await productPostDB(newProduct, imageProduct);
        throw Error(res);
    };
};

const readImageProduct = async (productID) => {
    try {
        let res = await imageProductGetDB(productID);
        return res;
    }
    catch {
        let res = await imageProductGetDB(productID);
        throw Error(res);
    };
};

const deleteProduct = async (productDeleteID) => {
    try {
        await productDeleteDB(productDeleteID);
    }
    catch {
        let res = await productDeleteDB(productDeleteID);
        throw Error(res);
    };
};

const updateProduct = async (productUpdate, imageUpdate, flagImage) => {
    try {
        await productUpdateDB(productUpdate, imageUpdate, flagImage);
    }
    catch {
        let res = await productUpdateDB(productUpdate, imageUpdate, flagImage);
        throw Error(res);
    };
};

const readProductSupply = async (productID) => {
    try {
        let res = await productSupplyGetDB(productID);
        return res;
    }
    catch (error) {
        throw Error(error);
    };
};

module.exports = { readProduct, createProduct, readImageProduct, deleteProduct, updateProduct, readProductSupply };