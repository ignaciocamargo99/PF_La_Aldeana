
const express = require("express");
const router = express.Router();
const flavorController = require("../controllers/flavorController");

//#region APIs

router.get('/allFlavors', flavorController.getFlavor);
router.get('/typeFlavors', flavorController.getTypeFlavor);
router.get('/familyFlavors', flavorController.getFamilyFlavor);

//#endregion


module.exports = router;