const express = require("express");
const router = express.Router();
const advancesController = require("../controllers/advancesController");

//#region APIs

router.get('/advances', advancesController.getAdvances);
router.post('/advances', advancesController.newAdvances);
router.put('/advances/:dni', advancesController.updateAdvances);
router.delete('/advances/:dni', advancesController.deleteAdvances);

//#endregion
module.exports = router;