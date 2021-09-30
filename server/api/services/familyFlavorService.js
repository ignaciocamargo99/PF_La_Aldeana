const { familyFlavorGetDB } = require('../db/familyFlavorDB');

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