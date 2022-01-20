const express = require("express");
const router = express.Router();
const salariesController = require("../controllers/salariesController");

//#region APIs

router.get('/salaries', salariesController.getSalaries);

//#endregion
module.exports = router;