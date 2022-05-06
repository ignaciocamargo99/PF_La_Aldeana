const express = require("express");
const router = express.Router();
const advancesController = require("../controllers/advancesController");

//#region APIs

router.get('/advances', advancesController.getAdvances);
router.get('/installmentstopay', advancesController.getInstallmentsToPay);
router.put('/installmentstopay', advancesController.updateInstallmentsToPay);
router.get('/installments', advancesController.getInstallments);
router.post('/advances', advancesController.newAdvances);
router.put('/advances', advancesController.updateAdvances);
router.delete('/advances', advancesController.deleteAdvances);
router.get('/employeesadvances', advancesController.getEmployee);

//#endregion
module.exports = router;