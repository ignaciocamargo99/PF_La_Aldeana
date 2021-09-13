const { purchaseSuppliesPostDB, purchasesGetDB, lastPurchaseGetDB } = require('./db');

const readPurchases = async () => {
    try {
        let res = await purchasesGetDB();
        return res;
    }
    catch {
        let res = await purchasesGetDB();
        throw Error(res);
    };
};

const readLastPurchase = async () => {
    try {
        let res = await lastPurchaseGetDB();
        return res;
    }
    catch {
        let res = await lastPurchaseGetDB();
        throw Error(res);
    };
};

const createPurchaseSupplies = async (newPurchase) => {
    try {
        await purchaseSuppliesPostDB(newPurchase);
    }
    catch {
        let res = await purchaseSuppliesPostDB(newPurchase);
        throw Error(res);
    };
};

module.exports = {
    readPurchases, readLastPurchase, createPurchaseSupplies
};