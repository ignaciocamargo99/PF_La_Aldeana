const express = require("express");
const router = express.Router();
const productionController = require("../controllers/productionController");

//#region APIs
router.post("/productions", productionController.postProductions);

router.get("/productions", productionController.getProductions)

router.get("/productions/:id_production", productionController.getProductionsFlavors)

//#endregion
module.exports = router;