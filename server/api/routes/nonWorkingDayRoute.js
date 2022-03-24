const express = require("express");
const router = express.Router();
const salesController = require("../controllers/nonWorkingDayGenerationController");

router.post("/generateNonWorkingDays", salesController.postGenerateNonWorkingDays);

module.exports = router;