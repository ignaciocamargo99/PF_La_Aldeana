const express = require("express");
const router = express.Router();

//#region controllers

const productController = require("../controllers/product");

//#endregion


//#region APIs

router.get("/", (req, res) => {
    res.send("Endpoint funcando")
})

router.get("/product", productController.getProducts);

//#endregion

module.exports = router;