const express = require("express");
const router = express.Router();
const userController = require("./controller");

//#region APIs

router.get("/flavors", userController.getFlavors);

//#endregion

module.exports = router;