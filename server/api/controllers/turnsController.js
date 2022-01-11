const { readTurns } = require('../services/turnsService')
const db = require("../../config/connection");

// [HTTP:GET]
async function getTurns(req, res) {
    try {
        const result = await readTurns();
        res.send(result)
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
};

module.exports = { getTurns };