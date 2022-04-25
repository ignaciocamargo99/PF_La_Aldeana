const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeControllerV2');

// #region APIs

router.get('/:dni', employeeController.getEmployeeByDNI);

// #endregion

module.exports = router;
