const express = require("express");
const router = express.Router();
const assistanceFingerController = require("../controllers/assistenceFingerController");

//#region APIs
router.get('/assistenceFinger', assistanceFingerController.newAssistance);
     
//#endregion
module.exports = router;