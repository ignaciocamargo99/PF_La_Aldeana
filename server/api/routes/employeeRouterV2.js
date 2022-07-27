const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeControllerV2");

// #region APIs

router.get("/:dni", employeeController.getEmployeeByDNI);

router.get("/date_entry/:date", employeeController.getEmployeesDateEntry);

// #endregion

module.exports = router;
