const express = require("express");
const router = express.Router();
const dayOffController = require("../controllers/dayOffController");

router.get("/daysOff?", dayOffController.getEmployeeDaysOffInRange);
router.post("/consecutiveDaysOffOfEmployee?", dayOffController.postConsecutiveDaysOffOfEmployee);

module.exports = router;
