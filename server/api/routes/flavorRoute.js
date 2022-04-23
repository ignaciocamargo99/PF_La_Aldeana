const express = require("express"); 
const router = express.Router();
const flavorController = require("../controllers/flavorController");

//#region APIs
router.get('/activeFlavors', flavorController.getActiveFlavors);
router.get('/flavors/:idFlavor', flavorController.getSingleFlavor);
router.get('/flavors', flavorController.getFlavor);
router.get('/typeFlavors', flavorController.getTypeFlavor);

//#endregion
module.exports = router;