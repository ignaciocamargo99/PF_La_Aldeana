const { getProductTypeDBByID, getProductTypeDB, updateProductTypeDB, deleteProductTypeDB } = require('../db/productTypeRepository');
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

    // HTTP: GET
    getProductType = async (req, res) => {
        try {
            const result = await getProductTypeDB();
            res.status(OK).send(result);

        }
        catch (e) {
            res.status(INTERNAL_SERVER_ERROR).send({ error: genericServerError });
        }
    };

    // HTTP: PUT
    updateProductType = async (req, res) => {
        try {
            const { id } = req.params;
            const { name } = req.body;
            if (!isValidNumber(id)) res.status(BAD_REQUEST).send('ID inválido.');
            if (!name) res.status(BAD_REQUEST).send('No existe nombre.');

            const result = await updateProductTypeDB(id, req.body);
            res.status(OK).send(result);
        }
        catch (e) {
            console.log(e.message);
            res.status(INTERNAL_SERVER_ERROR).send({ error: genericServerError });
        }
    };

    // HTTP: DELETE
    deleteProductType = async (req, res) => {
        try {
            const { id } = req.params;
            if (!isValidNumber(id)) res.status(BAD_REQUEST).send('ID inválido.');

            const result = await deleteProductTypeDB(id);
            res.status(OK).send('Producto eliminado');
        }
        catch (e) {
            console.log(e.message);
            res.status(INTERNAL_SERVER_ERROR).send({ error: genericServerError });
        }
    };
}

module.exports = new ProductTypeController();
