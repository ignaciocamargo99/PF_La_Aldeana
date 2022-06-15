const SectorModel = require('../database/models/sectorModel');

const getSectorsDB = () => {
    return SectorModel.findAll();
};

module.exports = { getSectorsDB };