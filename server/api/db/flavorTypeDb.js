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

module.exports = {
    saveFlavorTypeDB,
};