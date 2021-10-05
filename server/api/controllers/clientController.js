const {readClient, createClient, modifyClient} = require('../services/clientService');

// HTTP: GET
async function getClient(req, res) {
    try {
        const result = await readClient(req.params.cellphone);
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

<<<<<<< HEAD

module.exports = { getClient, postClient, putClient }
=======
module.exports = { getClient }
>>>>>>> origin/staging
