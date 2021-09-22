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
router.get("/imageProduct/:id", productController.getImage);
router.post("/products", fileUpload, productController.postProduct); 

router.get("/productSupply/:id", productController.getProductSupply);




router.put("/products", fileUpload, productController.updateProducts);
router.put("/products", productController.deleteProducts);

//#endregion
module.exports = router;