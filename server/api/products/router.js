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

router.put("/products/delete/", productController.deleteProduct);

router.put("/products/update", fileUpload, productController.updateProduct);

router.put("/productSupply/update", fileUpload, productController.updateProductsSupplies);

router.get("/supplies", productController.getSupplies);

router.post("/typeProduct/new", productController.postTypeProducts);

router.get("/typeSupplies", productController.getTypeSupplies);

router.post("/productSupply/new", fileUpload, productControllers.postProductSupply); // listo

router.post("/product/new", fileUpload, productControllers.postProduct); // listo

router.get("/image/:id", productController.getImage);

//#endregion

module.exports = router;