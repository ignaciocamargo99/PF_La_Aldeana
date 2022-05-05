const express = require("express");
const router = express.Router();
const salariesController = require("../controllers/salariesController");

//#region APIs

router.get('/salaries', salariesController.getSalaries);
router.post('/salaries', salariesController.newSalary);
router.put('/salaries/:id', salariesController.putSalary);
router.get('/salariesdetails/:id', salariesController.getDetails);
router.get('/salary', salariesController.getSalary);
router.get('/concepts', salariesController.getConcepts);
router.get('/hsWorked', salariesController.getHSWorked);
router.get('/bonus', salariesController.getBonus);

//#endregion
module.exports = router;