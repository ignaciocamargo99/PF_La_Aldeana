const { purchaseSuppliesPostDB, purchasesGetDB, lastPurchaseGetDB, readPurchasesByIdDB } = require('../db/purchaseSuppliesDB');

const readPurchases = async (from, to) => {
    try {
        let res = await purchasesGetDB(from, to);
        return res;
    }
    catch (error) {
        throw Error(error);
    };
};
const readPurchasesById = async (id) => {
    try {
        let res = await readPurchasesByIdDB(id);
        return res;
    } catch (error) {
        throw Error(error);
    }
};

const readLastPurchase = async () => {
    try {
        let res = await lastPurchaseGetDB();
        return res;
    }
    catch (error) {
        throw Error(error);
    };
};

const createPurchaseSupplies = async (newPurchase) => {
    try {
        await purchaseSuppliesPostDB(newPurchase);
    }
    catch (error) {
        throw Error(error);
    };
};

module.exports = { readPurchases, readLastPurchase, createPurchaseSupplies, readPurchasesById };