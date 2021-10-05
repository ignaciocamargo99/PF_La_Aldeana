
const { readLicense, createLicense, modifyLicense, deleteLicenses } = require('../services/licenseService');

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

// HTTP: PUT
async function putLicense(req, res) {
    try {
        await modifyLicense(req.params.id, req.body);
        res.json({
            Ok: true,
            Message: 'Licencia actualizada exitosamente.'
        })
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

// HTTP: DELETE
async function deleteLicense(req, res) { 
    try {
        await deleteLicenses(req.params.id);
        res.json({
            Ok: true,
            Message: 'Licencia eliminada exitosamente.'
        })
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

module.exports = { getLicense, postLicense, putLicense, deleteLicense }