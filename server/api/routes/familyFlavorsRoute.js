const express = require("express");
const router = express.Router();
const familyFlavorController = require("../controllers/familyFlavorController");

//#region APIs
router.get('/familyFlavors', familyFlavorController.getFamilyFlavor);

//#endregion
module.exports = router;