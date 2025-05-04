const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');
const { authenticate } = require('../middleware/auth');

// All budget routes are protected
router.use(authenticate);

// Budget routes
router.post('/', budgetController.createBudget);
router.get('/', budgetController.getUserBudgets);
router.get('/active', budgetController.getActiveBudget);
router.get('/:id', budgetController.getBudgetById);
router.put('/:id', budgetController.updateBudget);
router.delete('/:id', budgetController.deleteBudget);

module.exports = router; 