const express = require("express");
const router = express.Router();
const userController = require("./controller");

//#region APIs

router.post("/productions/new", userController.postProductions);

//#endregion

module.exports = router;