const express = require("express");
const router = express.Router();
const permissionsController = require("../controllers/permissionController");

//#region APIs
router.get("/permission", permissionsController.getPermissions);
router.get("/permission/filter/:rol", permissionsController.getPermissionsRol);

//#endregion
module.exports = router;