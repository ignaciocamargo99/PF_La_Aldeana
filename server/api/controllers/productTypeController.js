const { getProductTypeDBByID } = require('../db/productTypeRepository');
const { genericServerError } = require('../shared/errorMessages');
const {
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
    OK,
} = require('../shared/httpStatusCodes');
const { isValidNumber } = require('../shared/numberValidations');

class ProductTypeController {
    // HTTP: GET /:id
    getProductTypeByID = async (req, res) => {
        try {
            const { id } = req.params;

            if (!isValidNumber(id)) {
                res.status(BAD_REQUEST).send('ID inválido.');
            }

            const result = await getProductTypeDBByID(id);
            res.status(OK).send(result);
        }
        catch (e) {
            res.status(INTERNAL_SERVER_ERROR).send({ error: genericServerError });
        }
    };
}

module.exports = new ProductTypeController();
