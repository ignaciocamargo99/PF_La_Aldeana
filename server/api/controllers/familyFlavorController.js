const { readFamilyFlavor } = require('../services/familyFlavorService');

// HTTP: GET
async function getFamilyFlavor(req, res) {
    try {
        const result = await readFamilyFlavor();
        res.send(result)
    }
    catch (e) {
        res.json({
            Ok: false,
            Message: e.message,
        })
    }
}

module.exports = { getFamilyFlavor };