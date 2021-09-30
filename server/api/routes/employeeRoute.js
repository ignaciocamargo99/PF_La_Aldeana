
const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

//#region APIs

router.get('/employees', employeeController.getEmployee);

router.put('/employee/delete', employeeController.deleteEmployee);

router.get('/charges', employeeController.getCharges);

router.post('/newEmployee', employeeController.newEmployee);

router.put('/updateEmployee', employeeController.updateEmployee);

router.get('/assistanceEmployees', employeeController.getAssistanceEmployee);

//#endregion


module.exports = router;