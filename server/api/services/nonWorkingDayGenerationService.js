const { nonWorkingDayGenerationDB } = require('../db/nonWorkingDayGenerationDB'); 

const generateNonWorkingDays = async (newSale) => {
    try {
        await nonWorkingDayGenerationDB(newSale);
    }
    catch (error) {
        throw Error(error);
    };
};

module.exports = { generateNonWorkingDays }