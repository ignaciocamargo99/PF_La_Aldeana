const express = require("express");
const router = express.Router();
const productController = require("./controller");
const supplyController = require("../controllers/supplyController");
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

router.get("/typeProducts", productController.getTypeProduct);

router.get("/products", productController.getProduct);

router.get("/productsNotStock", productController.getProductNotStock);

router.get("/allProducts", productController.getAllProduct);

router.get("/productSupply/:id", productController.getProductSupply);

router.put("/products/delete/", productController.deleteProducts);

router.put("/products/update", fileUpload, productController.updateProducts);

router.put("/productSupply/update", fileUpload, productController.updateProductsSupplies);

router.get("/supplies", productController.getSupplies); 

router.post("/typeProduct/new", productController.postTypeProduct);  

router.get("/typeSupplies", productController.getTypeSupplies); 

router.post("/productSupply/new", fileUpload, productController.postProductSupply); 

router.post("/product/new", fileUpload, productController.postProduct); 

router.get("/image/:id", productController.getImage); 

router.post("/supply/new", supplyController.postSupply);

//#endregion

module.exports = router;