const express = require('express');
const router = express.Router();
const passport = require('passport');
const { signupUser, loginUser } = require('../controllers/authController');
const { generateToken, verifyToken } = require('../utils/auth');

// Route: POST /auth/signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const token = await signupUser(name, email, password);
    res.status(201).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: error.message });
  }
});

// Route: POST /auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await loginUser(email, password);
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ message: error.message });
  }
});

// Route: GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Route: GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  // Successful Google authentication
  const token = generateToken(req.user._id);
  res.redirect(`/dashboard?token=${token}`);
});

// Protected Route: GET /auth/userinfo
router.get('/userinfo', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Protected Route: GET /auth/logout
router.get('/logout', verifyToken, (req, res) => {
  res.json({ message: 'Logout successful' });
});

// Protected Route: DELETE /auth/delete
router.delete('/delete', verifyToken, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;