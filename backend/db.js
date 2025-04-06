const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

// Define User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Define Transaction Schema
const transactionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: String,
    date: {
        type: Date,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Define Savings Goal Schema
const savingsGoalSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    target_amount: {
        type: Number,
        required: true
    },
    current_amount: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        required: true
    },
    due_date: {
        type: Date,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);
const SavingsGoal = mongoose.model('SavingsGoal', savingsGoalSchema);

module.exports = {
    connectDB,
    User,
    Transaction,
    SavingsGoal
};