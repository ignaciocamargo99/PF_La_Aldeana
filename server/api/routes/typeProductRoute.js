const express = require("express");
const router = express.Router();
const typeProductController = require('../controllers/typeProductController');

//#region APIs
router.get("/typeProducts", typeProductController.getTypeProduct);
router.post("/typeProducts", typeProductController.postTypeProduct);  

//#endregion
module.exports = router;