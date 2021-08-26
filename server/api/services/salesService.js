const { PayTypesGetDB, salePostDB } = require('../db/salesDb'); 

const readPayTypes = async () => {
    try {
        let res = await PayTypesGetDB();
        return res;
    }
    catch {
        let res = await PayTypesGetDB();
        throw Error(res);
    };
};

const createSale = async (newSale) => {
    try {
        await salePostDB(newSale);
    }
    catch {
        let res = await salePostDB(newSale);
        throw Error(res);
    };
};

module.exports = { readPayTypes, createSale }