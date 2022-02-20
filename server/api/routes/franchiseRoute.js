const express = require("express");
const router = express.Router();
const franchiseController = require("../controllers/franchiseController");

//#region APIs

router.get("/franchises", franchiseController.getFranchises);

router.post("/franchises", franchiseController.postFranchise);

router.put("/franchises/:id", franchiseController.updateFranchise);

router.put("/franchise/:id", franchiseController.deleteFranchises);

//#endregion

module.exports = router;