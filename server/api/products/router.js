
const express = require("express");
const router = express.Router();
const productController = require("./controller");

//#region APIs

router.get("/typeProduct", productController.getTypeProducts);

router.get("/supplies", productController.getSupplies);

router.post("/typeProduct/new", productController.postTypeProducts);

router.get("/typeSupplies", productController.getTypeSupplies);

router.post("/product/new", productController.postProduct);

//#endregion

module.exports = router;