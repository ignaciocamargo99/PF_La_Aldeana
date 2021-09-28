const express = require("express");
const router = express.Router();
const salesReportController = require("../controllers/salesReportController");

//#region APIs
router.get("/salesReport", salesReportController.getSalesReport);

//#endregion
module.exports = router;