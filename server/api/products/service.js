const { productGetDB, productTypeGetDB, productSupplyGetDB, productPostDB,
    productSupplyPostDB, imageProductGetDB, typeSupplyGetDB,
    supplyGetDB, typeProductPostDB, productDeleteDB, productUpdateDB,
    productSupplyUpdateDB } = require('./db');

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
        let res = await productSupplyGetDB(productID);
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

const readTypeSupply = async () => {
    try {
        let res = await typeSupplyGetDB();
        return res;
    }
    catch {
        let res = await typeSupplyGetDB();
        throw Error(res);
    };
};

const readSupply = async () => {
    try {
        let res = await supplyGetDB();
        return res;
    }
    catch {
        let res = await supplyGetDB();
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


const updateProductSupply = async (productUpdate, imageUpdate, flagImage) => {
    try {
        await productSupplyUpdateDB(productUpdate, imageUpdate, flagImage);
    }
    catch {
        let res = await productSupplyUpdateDB(productUpdate, imageUpdate, flagImage);
        throw Error(res);
    };
};


module.exports = {
    readProduct, readTypeProduct, readProductSupply, createProduct,
    createProductSupply, readImageProduct, readTypeSupply, readSupply,
    createTypeProduct, deleteProduct, updateProduct, updateProductSupply
};