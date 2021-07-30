
const express = require("express");
const router = express.Router();
const productController = require("./controller");
const multer = require('multer');
const path = require('path');
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

router.post("/productSupply/new", fileUpload, productController.postProductsSupplies);

router.post("/product/new", fileUpload, productController.postProducts);

//#endregion

module.exports = router;