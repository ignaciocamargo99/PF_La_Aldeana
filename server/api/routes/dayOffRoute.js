const express = require("express");
const router = express.Router();
const dayOffController = require("../controllers/dayOffController");

router.get("/daysOff?", dayOffController.getEmployeeDaysOffInRange);

module.exports = router;
