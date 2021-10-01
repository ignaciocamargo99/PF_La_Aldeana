const express = require("express");
const router = express.Router();
const productionController = require("../controllers/productionController");

//#region APIs
router.post("/productions", productionController.postProductions);

//#endregion
module.exports = router;