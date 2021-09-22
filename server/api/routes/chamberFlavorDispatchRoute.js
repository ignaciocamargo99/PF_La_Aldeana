const express = require("express");
const router = express.Router();
const chamberFlavorDispatchController = require("../controllers/chamberFlavorDispatchController");

//#region APIs
router.post('/chamberFlavorsDispatch', chamberFlavorDispatchController.postChamberFlavors)

//#endregion
module.exports = router;