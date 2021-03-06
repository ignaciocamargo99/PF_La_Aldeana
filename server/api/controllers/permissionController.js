const { readPermissions, readPermissionsUser, readViews, readAccesses } = require('../services/permissionService');

// HTTP: GET
async function getPermissions(req, res) {
    try {
        const result = await readPermissions();
        res.send(result);
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

// HTTP: GET :id
async function getPermissionsUser(req, res) {
    try {
        const result = await readPermissionsUser(req.params.nick_user);
        res.send(result);
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
        res.send(result);
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        });
    }
}

// HTTP: GET
async function getAccesses(req, res) {
    try {
        const result = await readAccesses();
        res.send(result);
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        });
    }
}

module.exports = { getPermissions, getPermissionsUser, getViews, getAccesses };