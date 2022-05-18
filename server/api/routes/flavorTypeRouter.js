const express = require('express');
const router = express.Router();
const { postFlavorTypes, getFlavorTypeByID, putFlavorTypeByID, } = require('../controllers/flavorTypeController');

router.post('/', postFlavorTypes);
router.get('/:id', getFlavorTypeByID);
router.put('/:id', putFlavorTypeByID);

module.exports = router;
