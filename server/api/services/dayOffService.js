const { getDaysOffOfEmployeeBetweenTwoDates, saveDaysOff } = require('../db/dayOffRepository.js');

const searchDaysOffOfEmployeeBetweenTwoDates = async (minDate, maxDate, dniEmployee) => {
    try {
        let res = await getDaysOffOfEmployeeBetweenTwoDates(minDate, maxDate, dniEmployee);
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};

const saveConsecutiveDaysOffOfEmployee = async (firstDayOff, dniEmployee) => {
    try {
        let firstDate = new Date(firstDayOff);
        let posteriorDate = new Date(firstDate);
        posteriorDate.setDate(posteriorDate.getDate() + 1);

        const twoConsecutiveDaysOff = [
            createDayOffModel(firstDate, dniEmployee),
            createDayOffModel(posteriorDate, dniEmployee)
        ];

        let res = await saveDaysOff(twoConsecutiveDaysOff);
        return res;
    }
    catch (error) {
        throw Error(error)
    };
};

const createDayOffModel = (date, dniEmployee) => {
    return {
        dni_employee: dniEmployee,
        date: date,
    }
}

module.exports = { searchDaysOffOfEmployeeBetweenTwoDates, saveConsecutiveDaysOffOfEmployee };
