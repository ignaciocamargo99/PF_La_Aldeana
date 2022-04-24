const { createUser, modifyUser, userDelete } = require('../services/userService');

// HTTP: POST
async function postUser(req, res) {
    try {
        await createUser(req.body[0], req.body[1]);
        res.json({
            Ok: true,
            Message: 'Usuario registrado exitosamente.'
        });
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message
        });
    }
}

async function updateUser(req, res) {
    try {
        await modifyUser(req.params.id_user, req.body[0], req.body[1]);
        res.json({
            Ok: true,
            Message: 'Usuario modificado exitosamente.'
        });
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message
        });
    }
}

async function deleteUser(req, res) {
    try {
        await userDelete(req.params.id_user);
        res.json({
            Ok: true,
            Message: 'Usuario eliminado lógicamente exitosamente.'
        });
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message
        });
    }
}

module.exports = { postUser, updateUser, deleteUser };