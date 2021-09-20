const { chamberFlavorsDispatchPostDB } = require('../db/chamberFlavorDispatchDB');

const createChamberFlavorsDispatch = async (newFlavorsToDispatch) => {
    try {
        let res = await chamberFlavorsDispatchPostDB(newFlavorsToDispatch);
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};

module.exports = { createChamberFlavorsDispatch };