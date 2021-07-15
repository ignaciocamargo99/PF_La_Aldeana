
const express = require("express");
const router = express.Router();
const productController = require("./controller");

//#region APIs

router.get("/typeProduct", productController.getTypeProducts);

router.get("/supplies", productController.getSupplies);

//#endregion

module.exports = router;