const express = require('express');
const router = express.Router();
const typeProductController = require('../controllers/typeProductController');

//#region APIs

router.get('/typeProducts', typeProductController.getTypeProduct);

router.post('/typeProducts', typeProductController.postTypeProduct);  

router.put('/typeProducts/:id', typeProductController.deleteProductType);

//#endregion

module.exports = router;