const express = require('express');
const router = express.Router();
const productTypeController = require('../controllers/productTypeController');

// #region APIs

router.get('/:id', productTypeController.getProductTypeByID);

// #endregion

module.exports = router;
