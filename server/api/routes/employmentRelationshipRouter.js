const express = require('express');
const router = express.Router();
const employmentRelationshipController = require('../controllers/employmentRelationshipController');

// #region APIs

router.get('/:id', employmentRelationshipController.getEmploymentRelationshipByID);

// #endregion

module.exports = router;
