const { searchDaysOffOfEmployeeBetweenTwoDates } = require('../services/dayOffService')
const { saveConsecutiveDaysOffOfEmployee } = require('../services/dayOffService')

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

// [HTTP:POST]
async function postConsecutiveDaysOffOfEmployee(req, res) {
    try {
        // firstDayOff format: string ( YYYY/MM/dd - MM/dd/YYYY - MM-dd-YYYY )
        const { firstDayOff, dniEmployee } = req.query;
        await saveConsecutiveDaysOffOfEmployee(firstDayOff, dniEmployee);
        res.json({
            Ok: true,
            Message: "Días francos de empleado guardados exitosamente.",
        })
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
};

module.exports = { getEmployeeDaysOffInRange, postConsecutiveDaysOffOfEmployee };
