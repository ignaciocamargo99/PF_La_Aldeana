const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

//#region APIs

router.get('/employees/:dni?', employeeController.getEmployee);

router.post('/employees', employeeController.newEmployee);

router.put('/employees/:dni', employeeController.updateEmployee);

router.delete('/employees/:dni', employeeController.deleteEmployee);

router.get('/charges', employeeController.getCharges);

router.get('/relationships', employeeController.getRelationships);

router.post('/assistanceEmployee', employeeController.newAssistanceEmployee);

router.get('/employeeAssistance', employeeController.getEmployeeAssistance);

router.delete('/employeeAssistance/:dni', employeeController.deleteAssistance);

router.put('/employeeAssistance/:dni', employeeController.updateAssistanceEmployee)

//#endregion
module.exports = router;
