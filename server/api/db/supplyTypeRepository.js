const SupplyType = require('../database/models/supplyType');

const getSupplyTypesRepository = () => {
    return SupplyType.findAll()
        .then(supplyTypes => {
            return supplyTypes;
        })
        .catch(error => {
            return error;
        })
};

module.exports = { getSupplyTypesRepository };
