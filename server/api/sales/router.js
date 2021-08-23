const express = require("express");
const router = express.Router();
const SalesController = require("./controller");

router.get("/payTypes", SalesController.getPayTypes);

module.exports = router;