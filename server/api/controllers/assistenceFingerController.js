const {
    registerAssitance,
    getAssitance,
    getAssitanceAll
} = require('../services/assistenceFingerService');

// HTTP: GET
async function getAssistance(req, res) {
    try {
        const result = await getAssitance(req.params.dni);
        res.send(result);
    } catch (e) {
        res.json({
            Ok: false,
            Message: e.message
        });
    }
}

// HTTP: GET
async function getAssistanceAll(req, res) {
    try {
        const result = await getAssitanceAll();
        res.send(result);
    } catch (e) {
        res.json({
            Ok: false,
            Message: e.message
        });
    }
}

// HTTP: POST/PUT
async function newAssistance(req, res) {
    try {
        await registerAssitance(req.params.dni, req.body);
        res.json({
            Ok: true,
            Message: 'Asistencia registrada exitosamente.'
        });
    } catch (e) {
        res.json({
            Ok: false,
            Message: e.message
        });
    }
}

module.exports = { newAssistance, getAssistance, getAssistanceAll };
