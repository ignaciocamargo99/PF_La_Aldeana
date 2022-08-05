const express = require("express");
const router = express.Router();
const salesController = require("../controllers/salesController");

router.get("/payTypes", salesController.getPayTypes);
router.post("/sales", salesController.postSale);
router.get("/onSiteSales", salesController.getOnSiteSales);
router.get("/sales", salesController.getSales);
router.post("/salesDelivery", salesController.postSaleDelivery);

module.exports = router;
