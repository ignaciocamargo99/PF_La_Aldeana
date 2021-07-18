
const express = require("express");
const router = express.Router();
const userController = require("./controller");

//#region APIs

router.get("/user", userController.getUsers);
router.get("/user/filter/:nick", userController.getUsersByNick);
router.post("/user/new", userController.postUser);

//#endregion

module.exports = router;