const express = require("express");
const router = express.Router();
const fingerPrintController = require("../controllers/fingerPrintsController");

//#region APIs
router.get('/fingerPrints', fingerPrintController.getFingerPrints);
router.get('/fingerPrints/:dni', fingerPrintController.getFingersByDni);
router.post('/fingerPrints', fingerPrintController.newFingerPrint);
router.put('/fingerPrints', fingerPrintController.deleteFinger);
     
//#endregion
module.exports = router;    