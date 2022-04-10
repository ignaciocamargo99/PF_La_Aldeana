const { createUser } = require('../services/userService');

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
        })
    }
}

module.exports = { postUser }