const express = require("express");
const router = express.Router();
const salariesController = require("../controllers/salariesController");

//#region APIs

router.get('/salaries', salariesController.getSalaries);
router.post('/salaries', salariesController.newSalaries);
router.get('/hsWorked', salariesController.getHSWorked);
router.get('/bonus', salariesController.getBonus);

//#endregion
module.exports = router;