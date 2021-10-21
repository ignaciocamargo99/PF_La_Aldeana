const express = require("express");
const router = express.Router();
const fingerPrintController = require("../controllers/fingerPrintsController");

//#region APIs
router.get('/fingerPrints', fingerPrintController.getFingerPrints);
router.post('/fingerPrints', fingerPrintController.newFingerPrint);
     
//#endregion
module.exports = router;    