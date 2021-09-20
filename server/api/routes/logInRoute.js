const express = require("express");
const router = express.Router();
const userController = require("../controllers/logInController");

//#region APIs

router.get("/user", userController.getUsers);
router.get("/user/filter/:nick", userController.getUsersByNick);
router.get("/user/search/:nick", userController.getDataUsersByNick);
router.post("/user/new", userController.postUser);

//#endregion

module.exports = router;