const { fingerPrintCreateDB, fingerPrintsGetDB, fingerPrintsByDniGetDB, fingerPrintDeleteDB } = require('../db/fingerPrintsDB');

const readFingerPrints = async () => {
    try {
        let res = await fingerPrintsGetDB();
        return res;
    }
    catch(error) {
        throw Error(error)
    };
};

const readFingerByDni = async (dniEmployee) => {
    try {
        let res = await fingerPrintsByDniGetDB(dniEmployee);
        return res;
    }
    catch(error) {
        throw Error(error)
    };
};

const createFingerPrint = async (newFingerPrint) => {
    try {
        let res = await fingerPrintCreateDB(newFingerPrint);
        return res;
    }
    catch(error) {
        throw Error(error);
    };
};

const deleteFingerPrint = async (fingerPrint) => {
    try {
        let res = await fingerPrintDeleteDB(fingerPrint);
        return res;
    }
    catch(error){
        throw Error(error)
    };
};

module.exports = { createFingerPrint, readFingerPrints, readFingerByDni, deleteFingerPrint };