const { productGetDB, productPostDB, imageProductGetDB, productDeleteDB, productUpdateDB, productSupplyGetDB } = require('../db/productDB');

const readProduct = async () => {
    try {
        let res = await productGetDB();
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};

const createProduct = async (newProduct, imageProduct) => {
    try {
        let res = await productPostDB(newProduct, imageProduct);
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};

const readImageProduct = async (productID) => {
    try {
        let res = await imageProductGetDB(productID);
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};

const deleteProduct = async (productDeleteID) => {
    try {
        let res = await productDeleteDB(productDeleteID);
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};

const updateProduct = async (productUpdate, imageUpdate, flagImage) => {
    try {
        let res = await productUpdateDB(productUpdate, imageUpdate, flagImage);
        return res;
    }
    catch (error) {
        throw Error(error)
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