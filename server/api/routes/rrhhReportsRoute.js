const express = require("express");
const router = express.Router();
const rrhhReportController = require("../controllers/rrhhReportController");

//#region APIs
router.get("/salariesReport", rrhhReportController.getSalariesReport);

//#endregion
module.exports = router;