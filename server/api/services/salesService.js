const { PayTypesGetDB, salePostDB } = require('../db/salesDb'); 

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

module.exports = { readPayTypes, createSale }