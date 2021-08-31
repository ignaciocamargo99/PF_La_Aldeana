
const express = require("express");
const router = express.Router();
const franchiseController = require("./controller");

//#region APIs

router.get("/franchise", franchiseController.getFranchises);
router.post("/franchise/new", franchiseController.postFranchise);

//#endregion

module.exports = router;