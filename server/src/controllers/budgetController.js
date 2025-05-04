const Budget = require('../models/Budget');

// Create new budget
const createBudget = async (req, res) => {
  try {
    const { name, totalAmount, startDate, endDate, categories } = req.body;

    // Create new budget
    const newBudget = new Budget({
      user: req.userId,
      name,
      totalAmount,
      startDate,
      endDate,
      categories: categories || []
    });

    // Save budget to database
    await newBudget.save();

    res.status(201).json({
      message: 'Budget created successfully',
      budget: newBudget
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all budgets for a user
const getUserBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.userId }).sort({ createdAt: -1 });

    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get active budget for a user
const getActiveBudget = async (req, res) => {
  try {
    const currentDate = new Date();
    
    const activeBudget = await Budget.findOne({
      user: req.userId,
      isActive: true,
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate }
    });

    if (!activeBudget) {
      return res.status(404).json({ message: 'No active budget found' });
    }

    res.json(activeBudget);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single budget
const getBudgetById = async (req, res) => {
  try {
    const budget = await Budget.findOne({
      _id: req.params.id,
      user: req.userId
    });

    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    res.json(budget);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update budget
const updateBudget = async (req, res) => {
  try {
    const { name, totalAmount, startDate, endDate, categories, isActive } = req.body;

    // Find and update budget
    const updatedBudget = await Budget.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { name, totalAmount, startDate, endDate, categories, isActive },
      { new: true }
    );

    if (!updatedBudget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    res.json({
      message: 'Budget updated successfully',
      budget: updatedBudget
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete budget
const deleteBudget = async (req, res) => {
  try {
    const deletedBudget = await Budget.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });

    if (!deletedBudget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    res.json({
      message: 'Budget deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createBudget,
  getUserBudgets,
  getActiveBudget,
  getBudgetById,
  updateBudget,
  deleteBudget
}; 