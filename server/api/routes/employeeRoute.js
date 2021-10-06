const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

//#region APIs

router.get('/employees', employeeController.getEmployee);

router.post('/employees', employeeController.newEmployee);

router.put('/employees/:dni', employeeController.updateEmployee);

router.delete('/employees/:dni', employeeController.deleteEmployee);

router.get('/charges', employeeController.getCharges);

// router.get('/assistanceEmployee/:dni', employeeController.getAssistanceEmployee);

// router.post('/assistanceEmployee', employeeController.newAssistanceEmployee);

router.get('/employeeAssistance', employeeController.getEmployeeAssistance);

//#endregion
module.exports = router;