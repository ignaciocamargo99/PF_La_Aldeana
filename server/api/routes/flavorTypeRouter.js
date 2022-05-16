const express = require('express');
const router = express.Router();
const { postFlavorTypes } = require('../controllers/flavorTypeController');

router.post('/', postFlavorTypes);

module.exports = router;
