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
router.post("/productSupply/new", fileUpload, productController.postProduct); 
router.get("/image/:id", productController.getImage);
router.put("/products/delete/", productController.deleteProducts);
router.put("/products/update", fileUpload, productController.updateProducts);
router.get("/productSupply/:id", productController.getProductSupply); 

//#endregion

module.exports = router;