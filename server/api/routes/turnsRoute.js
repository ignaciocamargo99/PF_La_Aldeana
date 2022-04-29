const express = require("express");
const router = express.Router();
const turnsController = require("../controllers/turnsController");

//#region APIs
router.get("/turns", turnsController.getTurns);

//#endregion
module.exports = router;