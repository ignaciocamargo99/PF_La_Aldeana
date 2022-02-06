const express = require("express");
const router = express.Router();
const jdEmployeeController = require("../controllers/jdEmployeeController");

//#region APIs
router.get("/jdEmployee", jdEmployeeController.getJDEmployee);
router.get("/jdEmployee/Date", jdEmployeeController.getJDEmployeeInDate)
router.post("/jdEmployee", jdEmployeeController.postJDEmployee);
router.put("/jdEmployee", jdEmployeeController.updateJDEmployee);
router.delete("/jdEmployee", jdEmployeeController.deleteJDEmployee);
router.delete("/jdEmployee/Schedule", jdEmployeeController.deleteSchedule);
//#endregion
module.exports = router;