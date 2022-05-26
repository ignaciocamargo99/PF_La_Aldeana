const {
    getFlavorDBById,
    getFlavorsDBByActiveState,
    saveFlavorDB,
} = require('../db/flavorDb');

const searchFlavorsByActiveState = (onlyActiveFlavors) => {
    return getFlavorsDBByActiveState(onlyActiveFlavors);
};

const searchFlavorById = (flavorId) => {
    return getFlavorDBById(flavorId);
};

const createErrorToCreateFlavorObj = (message) => {
    return {
        flavorsCreated: false,
        message: message
    };
};

const createNewFlavors = async ({ flavors }) => {
    if (!(flavors) || flavors.length === 0) {
        return createErrorToCreateFlavorObj('No se recibieron sabores para registrar.');
    }

    if (flavors.length === 1) {
        if (isNewFlavorDataValid(flavors[0])) {
            const flavorDataMapped = mapFlavorData(flavors[0]);
            const { dataValues: newFlavor } = await saveFlavorDB(flavorDataMapped);

            return {
                flavorsCreated: true,
                flavors: [newFlavor],
                message: 'Sabor registrado correctamente.'
            };
        } else {
            return createErrorToCreateFlavorObj('El nuevo sabor posee datos inválidos.');
        }
    }

    if (flavors.length > 1) {
        return createErrorToCreateFlavorObj('Aún no se encuentra implementado el registro de múltiples sabores.');
    }
};

const mapFlavorData = (flavorData) => {
    const flavorDataMapped = { ...flavorData };
    flavorDataMapped.reorderStock = flavorData.reorderStock ? flavorData.reorderStock : null;
    flavorDataMapped.name = flavorData.name.trim();
    return flavorDataMapped;
};

const isNewFlavorDataValid = ({ flavorFamilyId, flavorTypeId, name, reorderStock, stock }) => {
    if (!name || (name.trim() === '')) {
        return false;
    }
    if (!stock) {
        return false;
    }
    if (!flavorFamilyId || isNaN(flavorFamilyId)) {
        return false;
    }
    if (!flavorTypeId || isNaN(flavorTypeId)) {
        return false;
    }
    if (reorderStock && isNaN(reorderStock)) {
        return false;
    }

    return true;
};

const createErrorToUpdateFlavorObj = (message) => {
    return {
        flavorUpdated: false,
        message: message
    };
};

const saveChangesToFlavor = async (idFlavor, flavorData) => {
    if (!(idFlavor) || isNaN(idFlavor)) {
        return createErrorToUpdateFlavorObj('No se recibió correctamente el id del sabor.');
    }

    if (!(flavorData)) {
        return createErrorToUpdateFlavorObj('No se recibieron datos para el sabor.');
    }

    if (!(isFlavorDataValid(flavorData))) {
        return createErrorToUpdateFlavorObj('No se recibieron datos válidos para el sabor.');
    }

    const flavor = await getFlavorDBById(idFlavor);
    if (!(flavor)) {
        return createErrorToUpdateFlavorObj('No se encontró un sabor para ese ID.');
    }

    if (flavorData.hasOwnProperty('description')) {
        flavor.description = flavorData.description;
    }
    if (flavorData.hasOwnProperty('reorderStock')) {
        flavor.reorderStock = flavorData.reorderStock ? flavorData.reorderStock : null;
    }
    if (flavorData.flavorFamilyId) {
        flavor.family_flavor = flavorData.flavorFamilyId;
    }
    if (flavorData.flavorTypeId) {
        flavor.type_flavor = flavorData.flavorTypeId;
    }
    if (flavorData.name) {
        flavor.name = flavorData.name;
    }
    if (flavorData.stock) {
        flavor.stock = flavorData.stock;
    }

    const { dataValues: flavorNewData } = await flavor.save();

    return {
        flavorUpdated: true,
        flavor: flavorNewData,
        message: 'Se editaron correctamente los datos para el sabor.'
    };
};

const isFlavorDataValid = ({ flavorFamilyId, flavorTypeId, reorderStock, stock }) => {
    if (stock && isNaN(stock)) {
        return false;
    }
    if (flavorFamilyId && isNaN(flavorFamilyId)) {
        return false;
    }
    if (flavorTypeId && isNaN(flavorTypeId)) {
        return false;
    }
    if (reorderStock && isNaN(reorderStock)) {
        return false;
    }

    return true;
};

const createErrorToDeleteFlavorObj = (message) => {
    return {
        flavorDeleted: false,
        message: message
    };
};

const deleteFlavorById = async (idFlavor) => {
    if (!(idFlavor) || isNaN(idFlavor)) {
        return createErrorToDeleteFlavorObj('No se recibió correctamente el id del sabor.');
    }

    const flavor = await getFlavorDBById(idFlavor);

    if (!(flavor)) {
        return createErrorToDeleteFlavorObj('No se encontró un sabor para ese ID.');
    }

    flavor.active = 0;

    const { dataValues: deletedFlavor } = await flavor.save();
    return {
        flavorDeleted: true,
        flavor: deletedFlavor,
        message: 'Se eliminó correctamente el sabor.'
    };
};

module.exports = {
    createNewFlavors,
    deleteFlavorById,

    saveChangesToFlavor,
    searchFlavorById,
    searchFlavorsByActiveState,
};
