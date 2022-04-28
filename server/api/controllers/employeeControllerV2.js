const employeeService = require('../services/employeeServiceV2');
const { genericServerError } = require('../shared/errorMessages');
const {
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
    OK,
} = require('../shared/httpStatusCodes');
const { isValidNumber } = require('../shared/numberValidations');

class EmployeeController {
    // HTTP: GET /:dni
    getEmployeeByDNI = async (req, res) => {
        try {
            const { dni } = req.params;

            if (!isValidNumber(dni)) {
                res.status(BAD_REQUEST).send('DNI inválido.');
            }

            const result = await employeeService.searchEmployeeByDNI(dni);
            res.status(OK).send(result);
        }
        catch (e) {
            res.status(INTERNAL_SERVER_ERROR).send({ error: genericServerError });
        }
    };
}

module.exports = new EmployeeController();
