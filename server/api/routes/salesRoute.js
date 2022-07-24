const express = require("express");
const router = express.Router();
const salesController = require("../controllers/salesController");

router.get("/payTypes", salesController.getPayTypes);
router.get("/sales", salesController.getOnSiteSales)
router.post("/sales", salesController.postSale);
router.post("/salesDelivery", salesController.postSaleDelivery); 
module.exports = router;