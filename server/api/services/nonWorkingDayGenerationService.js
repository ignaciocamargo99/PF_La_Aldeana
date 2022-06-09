const {
    nonWorkingDayGenerationDB
} = require('../db/nonWorkingDayGenerationDB');

const generateNonWorkingDays = async () => {
    try {
        await nonWorkingDayGenerationDB();
    } catch (error) {
        throw Error(error);
    }
};

module.exports = { generateNonWorkingDays };
