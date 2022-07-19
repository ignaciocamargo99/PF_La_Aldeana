const express = require('express');
const router = express.Router();
const suppliesController = require('../controllers/suppliesController');

//#region APIs

router.get('', suppliesController.getSuppliesByProperties);

//#endregion
module.exports = router;