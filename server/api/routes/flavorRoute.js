const express = require('express');
const router = express.Router();
const flavorController = require('../controllers/flavorController');

//#region APIs
router.get('/activeFlavors', flavorController.getActiveFlavors);
router.get('/flavors/:idFlavor', flavorController.getSingleFlavor);
router.get('/stockFlavorsReport', flavorController.getStockFlavorsReport);
router.get('/consuptionsReport', flavorController.getConsuptionsReport);

//#endregion
module.exports = router;