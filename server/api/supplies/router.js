
const express = require("express");
const router = express.Router();
const suppliesController = require("./controller");

//#region APIs

router.get("/supplies", suppliesController.getSupplies);

//#endregion

module.exports = router;