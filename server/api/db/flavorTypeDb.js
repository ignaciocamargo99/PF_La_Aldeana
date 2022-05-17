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

module.exports = {
    saveFlavorTypeDB,
    getFlavorTypeDBById,
};