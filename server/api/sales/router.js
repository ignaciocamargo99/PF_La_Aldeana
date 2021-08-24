const express = require("express");
const router = express.Router();
const salesController = require("../controllers/salesController");

router.get("/payTypes", salesController.getPayTypes);
router.post("/sales/new", salesController.postSale);  

module.exports = router;