const express = require('express');
const router = express.Router();
const { postFlavorTypes, getFlavorTypeByID } = require('../controllers/flavorTypeController');

router.post('/', postFlavorTypes);
router.get('/:id', getFlavorTypeByID);

module.exports = router;
