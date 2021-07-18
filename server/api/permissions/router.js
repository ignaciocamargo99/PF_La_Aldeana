
const express = require("express");
const router = express.Router();
const userController = require("./controller");

//#region APIs

router.get("/permission", userController.getPermissions);
router.get("/permission/filter/:rol", userController.getPermissionsRol);

//#endregion

module.exports = router;