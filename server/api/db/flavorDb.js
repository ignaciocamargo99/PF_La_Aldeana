const Flavor = require('../database/models/flavor');
const FlavorFamily = require('../database/models/flavorFamily');
const FlavorType = require('../database/models/flavorType');

const getFlavorsDBByActiveState = (onlyActiveFlavors) => {
    return Flavor.findAll({
        where: {
            active: onlyActiveFlavors
        },
        include: [FlavorFamily, FlavorType]
    });
};

const getFlavorsDBByProperties = ({ active, idFlavorType }) => {
    let whereCondition = {};

    if (active !== undefined) {
        whereCondition.active = active === 'true' ? true : false;
    }
    if (idFlavorType !== undefined) {
        whereCondition.type_flavor = +idFlavorType;
    }

    return Flavor.findAll({
        where: whereCondition
    });
};

const getFlavorDBById = (flavorId) => {
    return Flavor.findOne({
        where: {
            idFlavor: flavorId
        },
        include: [FlavorFamily, FlavorType]
    });
};

const saveFlavorDB = (flavorData) => {
    const {
        description,
        flavorFamilyId,
        flavorTypeId,
        name,
        reorderStock,
        stock,
    } = flavorData;

    return Flavor.create({
        description: description,
        family_flavor: flavorFamilyId,
        name: name,
        reorderStock: reorderStock,
        stock: stock,
        type_flavor: flavorTypeId,
    });
};

module.exports = {
    getFlavorsDBByActiveState,
    getFlavorDBById,
    saveFlavorDB,
    getFlavorsDBByProperties,
};