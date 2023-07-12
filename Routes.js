const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Movie = require('./models/Movie');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();

// Middleware to authenticate user
const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user object
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Authenticate a user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

    // Send the token as a response
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Fetch user data
router.get('/user', authenticate, async (req, res) => {
  try {
    // Get the user ID from the token
    const userId = req.userId;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user data as a response
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Fetch user preferences
router.get('/preferences', authenticate, async (req, res) => {
  try {
    // Get the user ID from the token
    const userId = req.userId;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user's movie preferences
    res.status(200).json({ preferences: user.preferences });
  } catch (error) {
    console.error('Error getting movie preferences:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

// Save user preferences
router.post('/postPreferences', authenticate, async (req, res) => {
  try {
    const userId = req.userId;

    // Get the preferences from the request body
    const { preferences } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's preferences
    user.preferences = preferences;
    await user.save();

    res.status(200).json({ message: 'Movie preferences saved successfully' });
  } catch (error) {
    console.error('Error saving movie preferences:', error);
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});

// Update user preferences
router.post('/updatePreferences', authenticate, async (req, res) => {
  try {
    const userId = req.userId;

    // Get the movie to be deleted from the request body
    const { movie } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove the movie from the preferences
    const updatedPreferences = user.preferences.filter((m) => m !== movie);
    user.preferences = updatedPreferences;
    await user.save();

    res.status(200).json({ message: 'Movie preferences updated successfully' });
  } catch (error) {
    console.error('Error updating movie preferences:', error);
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});

module.exports = router;
