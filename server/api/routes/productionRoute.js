const express = require("express");
const router = express.Router();
const productionController = require("../controllers/productionController");

//#region APIs
router.post("/productions", productionController.postProductions);

router.get("/productions", productionController.getProductions)

//#endregion
module.exports = router;