const { fingerPrintCreateDB } = require('../db/fingerPrintsDB');

const createFingerPrint = async (newFingerPrint) => {
    try {
        let res = await fingerPrintCreateDB(newFingerPrint);
        return res;
    }
    catch(error) {
        throw Error(error);
    };
};

module.exports = { createFingerPrint };