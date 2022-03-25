const { flavorsGetDB, typeFlavorGetDB, getFlavorsDBByActiveState, getFlavorDBById } = require('../db/flavorDb');

const readFlavor = async () => {
    try {
        let res = await flavorsGetDB();
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};

const searchFlavorsByActiveState = (onlyActiveFlavors) => {
    return getFlavorsDBByActiveState(onlyActiveFlavors);
};

const searchFlavorById = (flavorId) => {
    return getFlavorDBById(flavorId);
};

const readTypeFlavor = async () => {
    try {
        let res = await typeFlavorGetDB();
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};

module.exports = { readFlavor, readTypeFlavor, searchFlavorsByActiveState, searchFlavorById };
