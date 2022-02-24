const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

//#region APIs

router.get('/employees/:dni?', employeeController.getEmployee);

router.get('/employeesDesktop', employeeController.getEmployeeForDesktop);

router.post('/employees', employeeController.newEmployee);

router.put('/employees/:dni', employeeController.updateEmployee);

router.delete('/employees/:dni', employeeController.deleteEmployee);

router.get('/charges', employeeController.getCharges);

router.get('/relationships', employeeController.getRelationships);

//#endregion
module.exports = router;
