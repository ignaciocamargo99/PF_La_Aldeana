const express = require("express");
const router = express.Router();
const userController = require("../controllers/logInController");

//#region APIs

router.get("/users", userController.getUsers);

router.get("/users/filter/:nick", userController.getUsersByNick);

router.get("/users/search/:nick", userController.getDataUsersByNick);

router.post("/users", userController.postUser);
router.post("/loginDesktop", userController.logDesktop);

//#endregion

module.exports = router;