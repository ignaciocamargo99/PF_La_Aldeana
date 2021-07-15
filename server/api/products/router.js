
const express = require("express");
const router = express.Router();
const productController = require("./controller");

//#region APIs

router.get("/product", productController.getProducts);

//#endregion

module.exports = router;