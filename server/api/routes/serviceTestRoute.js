const express = require("express");
const router = express.Router();
const serviceTestController = require("../controllers/serviceTestController");

router.get("/serverDateTime", serviceTestController.getServerDateTime);

module.exports = router;