
const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");

//#region APIs
router.get('/clients', clientController.getClient);

router.post('/clients', clientController.postClient);

router.put('/clients/:cellphone', clientController.putClient);
//#endregion


module.exports = router;