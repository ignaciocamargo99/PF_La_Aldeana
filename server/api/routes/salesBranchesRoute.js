const express = require('express');
const router = express.Router();
const salesBranchesController = require('../controllers/salesBranchesController');

router.get('/salesBranches', salesBranchesController.getSalesBranches);
router.post('/salesBranches', salesBranchesController.postSaleBranch);

module.exports = router;
