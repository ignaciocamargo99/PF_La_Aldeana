const express = require("express");
const router = express.Router();
const permissionsController = require("../controllers/permissionController");

//#region APIs
router.get("/permissions", permissionsController.getPermissions);

router.get("/permissions/filter/:rol", permissionsController.getPermissionsRol);

// router.get("/views", permissionsController.getViews)

//#endregion
module.exports = router;