const express = require('express');
const router = express.Router();
const suppliesController = require('../controllers/suppliesController');

//#region APIs

router.get('/supplies', suppliesController.getSupplies);

router.get('/supplies-with-stock', suppliesController.getSuppliesWithStock);

router.post('/supplies', suppliesController.postSupply);

router.get('/typeSupplies', suppliesController.getTypeSupplies);

router.put('/supplies/:id', suppliesController.updateSupply);

router.put('/suppliesStock', suppliesController.updateSupplyStock);

router.put('/supply/:id', suppliesController.deleteSupply);

//#endregion
module.exports = router;