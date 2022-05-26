const {
    saveFlavorTypeDB,
} = require('../db/flavorTypeDb');

const isNewFlavorTypeDataValid = ({ name, price, }) => {
    if (!name || (name.trim() === '')) {
        return false;
    }
    if (!price || isNaN(price)) {
        return false;
    }

    return true;
};

const mapFlavorTypeData = (flavorTypeData) => {
    const flavorTypeDataMapped = { ...flavorTypeData };
    flavorTypeDataMapped.name = flavorTypeData.name.trim();
    return flavorTypeDataMapped;
};

const createNewFlavorType = async (flavorType) => {
    const flavorTypeDataMapped = mapFlavorTypeData(flavorType);
    const { dataValues: newFlavorType } = await saveFlavorTypeDB(flavorTypeDataMapped);

    return newFlavorType;
};

module.exports = {
    createNewFlavorType,
    isNewFlavorTypeDataValid,
};