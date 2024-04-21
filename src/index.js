require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
