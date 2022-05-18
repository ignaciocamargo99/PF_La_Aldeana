const { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK, } = require('../shared/httpStatusCodes');
const { genericServerError } = require('../shared/errorMessages');
const { createNewFlavorType, isNewFlavorTypeDataValid, } = require('../services/flavorTypeService');
const { isValidNumber } = require('../shared/numberValidations');
const { getFlavorTypeDBById, updateFlavorTypeDBById } = require('../db/flavorTypeDb');

async function postFlavorTypes(req, res) {
    try {
        const { flavorTypes } = req.body;

        if (!(flavorTypes) || flavorTypes.length === 0) {
            res.status(BAD_REQUEST).send(createErrorToCreateFlavorTypesObj('No se recibieron tipos de sabores para registrar.'));
        }

        if (flavorTypes.length > 1) {
            res.status(BAD_REQUEST).send(createErrorToCreateFlavorTypesObj('Aún no se encuentra implementado el registro de múltiples tipos de sabores.'));
        }

        if (!isNewFlavorTypeDataValid(flavorTypes[0])) {
            res.status(BAD_REQUEST).send(createErrorToCreateFlavorTypesObj('El nuevo tipo de sabor posee datos inválidos.'));
        }

        const result = await createNewFlavorType(flavorTypes[0]);
        res.status(OK).send(createSuccessToCreateFlavorTypesObj(result));
    }
    catch (e) {
        res.status(INTERNAL_SERVER_ERROR).send({ error: genericServerError });
    }
}

const getFlavorTypeByID = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidNumber(id)) {
            res.status(BAD_REQUEST).send('ID inválido.');
        }

        const result = await getFlavorTypeDBById(id);
        res.status(OK).send(result);
    }
    catch (e) {
        res.status(INTERNAL_SERVER_ERROR).send({ error: genericServerError });
    }
};

const createErrorToCreateFlavorTypesObj = (message) => {
    return {
        flavorTypesCreated: false,
        message: message
    };
};

const createSuccessToCreateFlavorTypesObj = (newFlavorType) => {
    return {
        flavorTypesCreated: true,
        flavorTypes: [newFlavorType],
        message: 'Tipo de sabor registrado correctamente.'
    };
};

const putFlavorTypeByID = async (req, res) => {
    try {
        const { id } = req.params;
        const { body: flavorTypeData } = req;

        if (!isValidNumber(id)) {
            res.status(BAD_REQUEST).send('ID inválido.');
        }

        const result = await updateFlavorTypeDBById(+id, flavorTypeData);

        if (result) {
            res.status(OK).send(result);
        } else {
            res.status(BAD_REQUEST).send('No se ha encontrado un tipo de sabor para ese ID.');
        }
    }
    catch (e) {
        if (e.name === 'SequelizeValidationError') {
            let error = '';

            e.errors.forEach(({ message }) => {
                if (error === '') {
                    error += message;
                }
                else {
                    error += '\n' + message;
                }

            });

            res.status(BAD_REQUEST).send({ error: error });
        }
        else {
            res.status(INTERNAL_SERVER_ERROR).send({ error: genericServerError });
        }
    }
};

module.exports = {
    postFlavorTypes,
    getFlavorTypeByID,
    putFlavorTypeByID,
};