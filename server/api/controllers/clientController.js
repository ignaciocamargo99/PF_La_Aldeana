const {readClient, createClient, modifyClient} = require('../services/clientService');

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

// HTTP: POST
async function postClient(req, res) {
    try {
        const result = await createClient(req.body);
        res.send(result)
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

// HTTP: PUT
async function putClient(req, res) {
    try {
        const result = await modifyClient(req.params.cellphone,req.body);
        res.send(result)
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}


module.exports = { getClient, postClient, putClient }