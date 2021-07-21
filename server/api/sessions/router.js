
const express = require("express");
const router = express.Router();
const sessionsController = require("./controller");

//#region APIs

router.get("/session", sessionsController.getSessions);
router.post("/session/update/:nick", sessionsController.updateSession);
router.post("/session/new", sessionsController.postSession);

//#endregion

module.exports = router;