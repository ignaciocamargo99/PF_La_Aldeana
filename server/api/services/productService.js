const { productGetDB, productPostDB, imageProductGetDB, productDeleteDB, productUpdateDB, productSupplyGetDB,
        productTypeGetDB,productSupplyPostDB, typeSupplyGetDB,supplyGetDB, typeProductPostDB, productSupplyUpdateDB,
        productAllGetDB, productStocksGetDB } = require('../db/productDB');

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

const updateProduct = async (idproduct, productUpdate, imageUpdate, flagImage) => {
    try {
        let res = await productUpdateDB(idproduct, productUpdate, imageUpdate, flagImage);
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

const readProductStocks = async () => {
    try {
        let res = await productStocksGetDB();
        return res;
    }
    catch (error) {
        throw Error(error);
    };
};

const readAllProduct = async () => {
    try {
        let res = await productAllGetDB();
        return res;
    }
    catch (error) {
        throw Error(error);
    };
};

const readTypeProduct = async () => {
    try {
        let res = await productTypeGetDB();
        return res;
    }
    catch (error) {
        throw Error(error);
    };
};

const createProductSupply = async (newProduct, imageProduct) => {
    try {
        await productSupplyPostDB(newProduct, imageProduct);
    }
    catch (error) {
        throw Error(error);
    };
};

const readTypeSupply = async () => {
    try {
        let res = await typeSupplyGetDB();
        return res;
    }
    catch (error) {
        throw Error(error);
    };
};

const readSupply = async () => {
    try {
        let res = await supplyGetDB();
        return res;
    }
    catch (error) {
        throw Error(error);
    };
};

const createTypeProduct = async (newTypeProduct) => {
    try {
        await typeProductPostDB(newTypeProduct);
    }
    catch (error) {
        throw Error(error);
    };
};

const updateProductSupply = async (productUpdate, imageUpdate, flagImage) => {
    try {
        await productSupplyUpdateDB(productUpdate, imageUpdate, flagImage);
    }
    catch (error) {
        throw Error(error);
    };
};

module.exports = { readProduct, createProduct, readImageProduct, deleteProduct, updateProduct, readProductSupply, 
    readTypeProduct, createProductSupply, readTypeSupply, readSupply, createTypeProduct, updateProductSupply, 
    readAllProduct, readProductStocks };