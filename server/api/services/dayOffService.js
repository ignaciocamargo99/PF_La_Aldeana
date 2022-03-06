const { getDaysOffOfEmployeeBetweenTwoDates } = require('../db/dayOffRepository.js');

const searchDaysOffOfEmployeeBetweenTwoDates = async (minDate, maxDate, dniEmployee) => {
    try {
        let res = await getDaysOffOfEmployeeBetweenTwoDates(minDate, maxDate, dniEmployee);
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};

module.exports = { searchDaysOffOfEmployeeBetweenTwoDates };
