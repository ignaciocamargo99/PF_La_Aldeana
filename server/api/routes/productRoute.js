const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const multer = require('multer');
const path = require('path');

const diskStorage = multer.diskStorage({
    destination: path.join(__dirname, '../images/productImages/'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const fileUpload = multer({
    storage: diskStorage,
}).single('image');

//#region APIs

router.get("/products", productController.getProduct);

router.get("/products/delivery", productController.getDeliveryProducts);

router.post("/products", fileUpload, productController.postProduct);

router.put("/products/:id", fileUpload, productController.updateProducts);

router.delete("/products/:id", productController.deleteProducts);

router.get("/imageProduct/:id", productController.getImage);

router.get("/productxsupply", productController.getProductXSupply);

router.get("/productSupply/:id", productController.getProductSupply);

router.get("/productsStocks", productController.getProductStocks);

//#endregion
module.exports = router;