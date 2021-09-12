
const express = require("express");
const router = express.Router();
const flavorController = require("../controllers/flavorController");

//#region APIs
router.get('/allFlavors', flavorController.getFlavor);
router.get('/typeFlavors', flavorController.getTypeFlavor);
router.get('/familyFlavors', flavorController.getFamilyFlavor);
router.post('/chamberFlavorsDispatch/new', flavorController.postChamberFlavors)
//#endregion


module.exports = router;