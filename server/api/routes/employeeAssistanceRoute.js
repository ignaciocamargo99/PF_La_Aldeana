const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeAssistanceController");

//#region APIs

router.post('/assistanceEmployee', employeeController.newAssistanceEmployee);

router.get('/employeeAssistance', employeeController.getEmployeeAssistance);

router.delete('/employeeAssistance/:dni', employeeController.deleteAssistance);

router.put('/employeeAssistance/:dni', employeeController.updateAssistanceEmployee)

router.get('/allEmployeeAssistance', employeeController.getAllEmployeeAssistance)

//#endregion
module.exports = router;