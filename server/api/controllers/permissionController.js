const { readPermissions, readPermissionsRol, readViews } = require('../services/permissionService');

// HTTP: GET
async function getPermissions(req, res) {
    try {
        const result = await readPermissions();
        res.send(result)
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

// HTTP: GET :id
async function getPermissionsRol(req, res) {
    try {
        const result = await readPermissionsRol(req.params.rol);
        res.send(result)
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

// HTTP: GET
async function getViews(req, res) {
    try {
        const result = await readViews();
        res.send(result)
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

module.exports = { getPermissions, getPermissionsRol, getViews };