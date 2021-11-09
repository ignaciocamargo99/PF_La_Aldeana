const { registerAssitance } = require('../services/assistenceFingerService');

// HTTP: POST/PUT
async function newAssistance(req, res) {
    try {
        await registerAssitance(req.body);
        res.json({
            Ok: true,
            Message: 'Asistencia registrada exitosamente.'
        })
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

module.exports = { newAssistance }