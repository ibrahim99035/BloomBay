const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../utils/auth');

// Register a new user
const signupUser = async (name, email, password) => {
  try {
    // Check if user with the same email already exists
    let user = await User.findOne({ email });

    if (user) {
      throw new Error('User already exists');
    }

    // Create new user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await User.create({ name, email, password: hashedPassword });

    return generateToken(user._id);
  } catch (error) {
    throw new Error('User registration failed');
  }
};

// Login a user
const loginUser = async (email, password) => {
  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    return generateToken(user._id);
  } catch (error) {
    throw new Error('User login failed');
  }
};

module.exports = { signupUser, loginUser };