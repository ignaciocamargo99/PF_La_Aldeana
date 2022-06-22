const express = require('express');
const router = express.Router();
const salesBranchesController = require('../controllers/salesBranchesController');

router.get('/salesBranches', salesBranchesController.getSalesBranches);
router.get('/salesBranches/:id', salesBranchesController.getSalesBranchesByID);
router.post('/salesBranches', salesBranchesController.postSaleBranch);
router.put('/salesBranches/:id', salesBranchesController.putSaleBranch);

module.exports = router;
