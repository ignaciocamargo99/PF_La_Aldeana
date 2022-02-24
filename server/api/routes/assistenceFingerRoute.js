const express = require("express");
const router = express.Router();
const assistanceFingerController = require("../controllers/assistenceFingerController");

//#region APIs
router.get('/assistenceFinger/:dni', assistanceFingerController.getAssistance);
router.post('/assistenceFinger/:dni', assistanceFingerController.newAssistance);
     
//#endregion
module.exports = router;