const DayOffModel = require('../database/models/dayOffModel');
const { Op } = require('sequelize')

const getDaysOffOfEmployeeBetweenTwoDates = (minDate, maxDate, dniEmployee) => {
    return DayOffModel.findAll({
        where: {
            dni_employee: dniEmployee,
            date: {
                [Op.gte]: minDate,
                [Op.lte]: maxDate,
            },
        }
    })
};

const saveDaysOff = (daysOffList) => {
    DayOffModel.bulkCreate(daysOffList);
};

module.exports = { getDaysOffOfEmployeeBetweenTwoDates, saveDaysOff };
