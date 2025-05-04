const Transaction = require('../models/Transaction');
const mongoose = require('mongoose');

// Create new transaction
const createTransaction = async (req, res) => {
  try {
    const {
      amount,
      description,
      category,
      date,
      isIncome,
      paymentMethod,
      location,
      externalId,
      receiptImage,
      notes
    } = req.body;

    // Create new transaction
    const newTransaction = new Transaction({
      user: req.userId,
      amount,
      description,
      category,
      date: date || new Date(),
      isIncome: isIncome || false,
      paymentMethod,
      location,
      externalId,
      receiptImage,
      notes
    });

    // Save transaction to database
    await newTransaction.save();

    res.status(201).json({
      message: 'Transaction created successfully',
      transaction: newTransaction
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all transactions for a user
const getUserTransactions = async (req, res) => {
  try {
    // Get query parameters
    const { 
      startDate, 
      endDate, 
      category, 
      isIncome,
      limit = 50,
      page = 1
    } = req.query;

    // Build query
    const query = { user: req.userId };

    // Add date range filter if provided
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    // Add category filter if provided
    if (category) {
      query.category = category;
    }

    // Add income/expense filter if provided
    if (isIncome !== undefined) {
      query.isIncome = isIncome === 'true';
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get total count
    const total = await Transaction.countDocuments(query);

    // Get transactions
    const transactions = await Transaction.find(query)
      .sort({ date: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    res.json({
      transactions,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get transaction by ID
const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.userId
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update transaction
const updateTransaction = async (req, res) => {
  try {
    const {
      amount,
      description,
      category,
      date,
      isIncome,
      paymentMethod,
      location,
      receiptImage,
      notes
    } = req.body;

    // Find and update transaction
    const updatedTransaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      {
        amount,
        description,
        category,
        date,
        isIncome,
        paymentMethod,
        location,
        receiptImage,
        notes
      },
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json({
      message: 'Transaction updated successfully',
      transaction: updatedTransaction
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete transaction
const deleteTransaction = async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });

    if (!deletedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json({
      message: 'Transaction deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get spending summary by category
const getSpendingSummary = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Build date range filter
    const dateFilter = {};
    if (startDate) dateFilter.$gte = new Date(startDate);
    if (endDate) dateFilter.$lte = new Date(endDate);

    // Aggregate transactions by category
    const summary = await Transaction.aggregate([
      {
        $match: {
          user: mongoose.Types.ObjectId(req.userId),
          ...(Object.keys(dateFilter).length > 0 && { date: dateFilter }),
          isIncome: false
        }
      },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { total: -1 }
      }
    ]);

    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createTransaction,
  getUserTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getSpendingSummary
}; 