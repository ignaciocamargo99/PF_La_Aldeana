const express = require("express");
const router = express.Router();
const purchasesSuppliesController = require("../controllers/purchaseSuppliesController");

//#region APIs
router.get("/purchases", purchasesSuppliesController.getPurchases);
router.get('/purchases/:id', purchasesSuppliesController.getPurchasesByID);
router.get("/lastPurchase", purchasesSuppliesController.getLastPurchase);
router.post("/purchases", purchasesSuppliesController.postPurchaseSupplies);

//#endregion
module.exports = router;