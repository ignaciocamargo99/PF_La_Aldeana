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
router.post("/products", fileUpload, productController.postProduct); 
router.put("/products/:id", fileUpload, productController.updateProducts);
router.delete("/products/:id", productController.deleteProducts);
router.get("/imageProduct/:id", productController.getImage);
router.get("/productSupply/:id", productController.getProductSupply);
router.get("/typeProducts", productController.getTypeProduct);
router.get("/products", productController.getProduct);
router.get("/productsStocks", productController.getProductStocks);
router.get("/allProducts", productController.getAllProduct);
router.put("/productSupply/update", fileUpload, productController.updateProductsSupplies);
router.get("/supplies", productController.getSupplies); 
router.post("/typeProduct/new", productController.postTypeProduct);  
router.get("/typeSupplies", productController.getTypeSupplies); 
router.post("/productSupply/new", fileUpload, productController.postProductSupply); 

//#endregion
module.exports = router;