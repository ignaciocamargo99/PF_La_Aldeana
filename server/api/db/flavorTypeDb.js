const FlavorType = require('../database/models/flavorType');

const saveFlavorTypeDB = (flavorTypeData) => {
    const {
        description,
        name,
        price,
    } = flavorTypeData;

    return FlavorType.create({
        description: description,
        name: name,
        price: price,
    });
};

const getFlavorTypeDBById = (flavorTypeId) => {
    return FlavorType.findOne({
        where: {
            idFlavorType: flavorTypeId
        },
    });
};

const updateFlavorTypeDBById = async (flavorTypeId, flavorTypeData) => {
    const ft = await getFlavorTypeDBById(flavorTypeId);
    ft?.set(flavorTypeData);
    return await ft?.save();
};

module.exports = {
    saveFlavorTypeDB,
    getFlavorTypeDBById,
    updateFlavorTypeDBById,
};