
const express = require("express");
const router = express.Router();
const purchasesSuppliesController = require("./controller");

//#region APIs

router.get("/purchase", purchasesSuppliesController.getPurchases);
router.get("/purchase/last", purchasesSuppliesController.getLastPurchase);
router.post("/purchase/new", purchasesSuppliesController.postPurchaseSupplies);

//#endregion

module.exports = router;