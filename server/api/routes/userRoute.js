const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//#region APIs

router.post('/user', userController.postUser);

//#endregion
module.exports = router;