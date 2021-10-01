const { flavorsGetDB, typeFlavorGetDB } = require('../db/flavorDb');

const readFlavor = async () => {
    try {
        let res = await flavorsGetDB();
        return res;
    }
    catch (error) {
        throw Error(error)
    };
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

module.exports = { readFlavor, readTypeFlavor };