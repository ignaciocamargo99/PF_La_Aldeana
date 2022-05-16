const {
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
    OK,
} = require('../shared/httpStatusCodes');

const { genericServerError } = require('../shared/errorMessages');
const {
    createNewFlavorType,
    isNewFlavorTypeDataValid,
} = require('../services/flavorTypeService');

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


module.exports = {
    postFlavorTypes,
};