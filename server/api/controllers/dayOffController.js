const { searchDaysOffOfEmployeeBetweenTwoDates } = require('../services/dayOffService')

// [HTTP:GET]
async function getEmployeeDaysOffInRange(req, res) {
    try {
        const { minDate, maxDate, dniEmployee } = req.query;
        const result = await searchDaysOffOfEmployeeBetweenTwoDates(minDate, maxDate, dniEmployee);
        res.json({
            Ok: true,
            Data: result,
        })
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
};

module.exports = { getEmployeeDaysOffInRange };
