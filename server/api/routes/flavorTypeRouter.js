const express = require('express');
const router = express.Router();
const { postFlavorTypes, getFlavorTypeByID, putFlavorTypeByID, deleteFlavorTypeByID, getActiveFlavorTypes, } = require('../controllers/flavorTypeController');

router.post('/', postFlavorTypes);
router.get('/', getActiveFlavorTypes);
router.get('/:id', getFlavorTypeByID);
router.put('/:id', putFlavorTypeByID);
router.delete('/:id', deleteFlavorTypeByID);

module.exports = router;
