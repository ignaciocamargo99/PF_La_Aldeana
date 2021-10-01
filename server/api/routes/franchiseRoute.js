const express = require("express");
const router = express.Router();
const franchiseController = require("../controllers/franchiseController");

//#region APIs

router.get("/franchises", franchiseController.getFranchises);
router.post("/franchises", franchiseController.postFranchise);

//#endregion

module.exports = router;