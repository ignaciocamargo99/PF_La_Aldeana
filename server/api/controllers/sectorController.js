const { getSectorsDB } = require('../db/sectorRepository');
const { genericServerError } = require('../shared/errorMessages');
const { INTERNAL_SERVER_ERROR, OK } = require('../shared/httpStatusCodes');

// HTTP: GET
async function getSectors(req, res) {
    try {
        const sectors = await getSectorsDB(req.query);
        const result = {
            amount: sectors.length,
            sectors: sectors,
        };
        res.status(OK).send(result);
    } catch (e) {
        res.status(INTERNAL_SERVER_ERROR).send({ error: genericServerError });
    }
}

module.exports = { getSectors };