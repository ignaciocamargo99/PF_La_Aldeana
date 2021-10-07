const express = require("express");
const router = express.Router();
const advancesController = require("../controllers/advancesController");

//#region APIs

router.get('/advances', advancesController.getAdvances);
router.get('/installments', advancesController.getInstallments);
router.post('/advances', advancesController.newAdvances);
router.put('/advances', advancesController.updateAdvances);
router.delete('/advances', advancesController.deleteAdvances);

//#endregion
module.exports = router;