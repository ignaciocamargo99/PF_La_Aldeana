const { licenseGetDB, licenseCreateDB } = require('../db/licenseDb');

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

module.exports = { readLicense, createLicense};