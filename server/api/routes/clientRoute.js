const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");

//#region APIs
router.get('/clients', clientController.getClient);

//#endregion
module.exports = router;