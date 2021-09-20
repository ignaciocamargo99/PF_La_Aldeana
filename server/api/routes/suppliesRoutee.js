const express = require("express");
const router = express.Router();
const suppliesController = require("../controllers/suppliesController");

//#region APIs

router.get("/supplies", suppliesController.getSupplies);
router.post("/supplies", suppliesController.postSupply);

//#endregion

module.exports = router;