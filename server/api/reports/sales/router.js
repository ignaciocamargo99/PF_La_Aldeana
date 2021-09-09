
const express = require("express");
const router = express.Router();
const salesReportController = require("./controller");

//#region APIs

router.get("/salesReport", salesReportController.getSalesReport);

//#endregion

module.exports = router;