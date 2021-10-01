
const { readLicense, createLicense } = require('../services/licenseService');

// HTTP: GET
async function getLicense(req, res) {
    try {
        const result = await readLicense();
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
async function postLicense(req, res) {
    try {
        await createLicense(req.body);
        res.json({
            Ok: true,
            Message: 'Licencia registrada exitosamente.'
        })
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

module.exports = { getLicense, postLicense }