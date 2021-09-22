const {readClient} = require('../services/clientService');

// HTTP: GET
async function getClient(req, res) {
    try {
        const result = await readClient();
        res.send(result)
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

module.exports = { getClient }