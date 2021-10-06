const { PayTypesGetDB, salePostDB, ProductXSupplyGetDB} = require('../db/salesDb'); 

const readPayTypes = async () => {
    try {
        let res = await PayTypesGetDB();
        return res;
    }
    catch (error) {
        throw Error(error);
    };
};

const createSale = async (newSale) => {
    try {
        await salePostDB(newSale);
    }
    catch (error) {
        throw Error(error);
    };
};

const readProductXSupply = async () => {
    try {
        let res = await ProductXSupplyGetDB();
        return res;
    }
    catch {
        let res = await ProductXSupplyGetDB();
        throw Error(res);
    };
};

module.exports = { readPayTypes, createSale, readProductXSupply }