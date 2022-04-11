const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//#region APIs

router.post('/user', userController.postUser);

router.put('/user/:id_user', userController.updateUser);

router.put('/userPermission/:id_user', userController.deleteUser);

//#endregion
module.exports = router;