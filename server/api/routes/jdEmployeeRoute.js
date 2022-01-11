const express = require("express");
const router = express.Router();
const jdEmployeeController = require("../controllers/jdEmployeeController");

//#region APIs
router.get("/jdEmployee", jdEmployeeController.getJDEmployee);

//#endregion
module.exports = router;