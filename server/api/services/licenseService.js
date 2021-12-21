const { licenseGetDB, licenseCreateDB, licenseUpdateDB, licenseDeleteDB } = require('../db/licenseDb');

const readLicense = async () => {
    try {
        let res = await licenseGetDB();
        return res;
    }
    catch(error) {
        throw Error(error)
    };
};

const createLicense = async (newLicense) => {
    try {
        let res = await licenseCreateDB(newLicense);
        return res;
    }
    catch {
        throw Error('Error. No se han podido registrar la licencia.')
    };
};

const modifyLicense = async (idLicense, updateLicense) => {
    try {
        let res = await licenseUpdateDB(idLicense, updateLicense);
        return res;
    }
    catch(error) {
        throw Error(error);
    };
};

const deleteLicenses = async (idLicense) => {
    try {
        let res = await licenseDeleteDB(idLicense);
        return res;
    }
    catch(error){
        throw Error(error)
    };
};

module.exports = { readLicense, createLicense, modifyLicense, deleteLicenses};