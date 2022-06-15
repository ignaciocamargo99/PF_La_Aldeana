const SectorModel = require('../database/models/SectorModel');

const getSectorsDB = () => {
    return SectorModel.findAll();
};

module.exports = { getSectorsDB };