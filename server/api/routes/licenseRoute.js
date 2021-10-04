
const express = require("express");
const router = express.Router();
const licenseController = require("../controllers/licenseController");

//#region APIs

router.get('/licenses', licenseController.getLicense);
router.post('/licenses', licenseController.postLicense);
router.put('/licenses/:id', licenseController.putLicense);
router.delete('/licenses/:id', licenseController.deleteLicense);

//#endregion


module.exports = router;