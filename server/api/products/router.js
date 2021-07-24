
const express = require("express");
const router = express.Router();
const productController = require("./controller");
const supplyController = require("../controllers/supplyController");
const db = require('../../config/connection');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const diskStorage = multer.diskStorage({
    destination: path.join(__dirname, './images/'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const fileUpload = multer({
    storage: diskStorage,
}).single('image');

//#region APIs

router.get("/typeProduct", productController.getTypeProducts);

router.get("/products", productController.getProducts);

router.get("/supplies", productController.getSupplies);

router.post("/typeProduct/new", productController.postTypeProducts);

router.get("/typeSupplies", productController.getTypeSupplies);

router.post("/product/new", fileUpload, productController.postProduct);

router.post("/supply/new", supplyController.postSupply);

//#endregion

module.exports = router;