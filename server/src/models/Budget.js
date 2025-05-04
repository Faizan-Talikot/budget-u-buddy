const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  color: {
    type: String,
    default: '#4338ca' // Default color
  },
  icon: {
    type: String,
    default: 'dollar-sign' // Default icon
  },
  isEssential: {
    type: Boolean,
    default: false
  }
});

const budgetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  categories: [categorySchema],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate total budget allocation across categories
budgetSchema.methods.getTotalAllocated = function() {
  return this.categories.reduce((total, category) => total + category.amount, 0);
};

// Calculate remaining budget
budgetSchema.methods.getRemainingAmount = function() {
  return this.totalAmount - this.getTotalAllocated();
};

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget; 