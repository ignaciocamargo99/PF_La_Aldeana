const { familyFlavorGetDB } = require('../db/familyFlavorDb');

const readFamilyFlavor = async () => {
    try {
        let res = await familyFlavorGetDB();
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};

module.exports = { readFamilyFlavor };