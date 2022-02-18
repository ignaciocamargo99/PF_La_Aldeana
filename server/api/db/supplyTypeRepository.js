const SupplyType = require('../database/models/supplyType');

const getSupplyTypesRepository = () => {
    return SupplyType.findAll();
};

module.exports = { getSupplyTypesRepository };
