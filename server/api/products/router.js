const express = require("express");
const router = express.Router();
const productController = require("./controller");
const productControllers = require("../../controllers/productController");
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

router.get("/typeProducts", productControllers.getTypeProduct); // listo

router.get("/products", productControllers.getProduct); // listo

router.get("/productSupply/:id", productControllers.getProductSupply); // listo

router.put("/products/delete/", productControllers.deleteProducts); // listo

router.put("/products/update", fileUpload, productControllers.updateProducts); // 

router.put("/productSupply/update", fileUpload, productController.updateProductsSupplies);

router.get("/supplies", productControllers.getSupplies); // listo

router.post("/typeProduct/new", productControllers.postTypeProduct);  // listo

router.get("/typeSupplies", productControllers.getTypeSupplies); // listo

router.post("/productSupply/new", fileUpload, productControllers.postProductSupply); // listo

router.post("/product/new", fileUpload, productControllers.postProduct); // listo

router.get("/image/:id", productControllers.getImage); // listo

//#endregion

module.exports = router;