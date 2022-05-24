const express = require('express');
const router = express.Router();
const productTypeController = require('../controllers/productTypeController');

// #region APIs

router.get('/:id', productTypeController.getProductTypeByID);

router.get('/', productTypeController.getProductType);

router.put('/:id', productTypeController.updateProductType);

// #endregion

module.exports = router;
