const mongoose = require('mongoose');

const User = require('./User');
// Create a schema for movie preferences
const movie = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  preferences: {
    type: [String],
    required: true,
  },
});

const MoviePreferences = mongoose.model('Movie', movie);
