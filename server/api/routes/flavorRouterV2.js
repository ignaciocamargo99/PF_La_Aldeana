const express = require('express');
const router = express.Router();
const flavorController = require('../controllers/flavorController');

router.post('/', flavorController.postFlavors);
router.put('/:idFlavor', flavorController.updateFlavor);
router.delete('/:idFlavor', flavorController.deleteFlavor);

module.exports = router;
