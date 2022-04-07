const express = require("express");
const router = express.Router();
const permissionsController = require("../controllers/permissionController");

//#region APIs
router.get("/permissions", permissionsController.getPermissions);

router.get("/permissions/filter/:nick_user", permissionsController.getPermissionsUser);

router.get("/views", permissionsController.getViews);

router.put("/permissions", permissionsController.putPermissionsRol);

//#endregion
module.exports = router;