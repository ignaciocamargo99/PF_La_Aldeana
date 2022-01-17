const express = require("express");
const router = express.Router();
const jdEmployeeController = require("../controllers/jdEmployeeController");

//#region APIs
router.get("/jdEmployee", jdEmployeeController.getJDEmployee);
router.post("/jdEmployee", jdEmployeeController.postJDEmployee);
router.put("/jdEmployee", jdEmployeeController.updateJDEmployee);
//#endregion
module.exports = router;