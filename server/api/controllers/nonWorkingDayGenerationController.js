const {
    generateNonWorkingDays
} = require('../services/nonWorkingDayGenerationService');

async function postGenerateNonWorkingDays(req, res) {
    try {
        await generateNonWorkingDays();
        res.json({
            Ok: true,
            Message: 'Francos generados exitosamente.'
        });
    } catch (e) {
        res.json({
            Ok: false,
            Message: e.message
        });
    }
}

module.exports = { postGenerateNonWorkingDays };
