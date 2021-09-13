const { supplyPostDB } = require('../models/supply.db');

const createSupply = async (newSupply) => {
    try {
        await supplyPostDB(newSupply);
    }
    catch {
        throw Error('Error. No se ha podido registrar el insumo.')
    };
};

module.exports = { createSupply }