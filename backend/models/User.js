const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: function (value) {
        // Regular expression to validate email format
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
      },
      message: 'Please provide a valid email address'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  preferences: {
    type: [String],
    default: [],
    validate: {
      validator: function (value) {
        return Array.isArray(value) && value.length <= 10;
      },
      message: 'Preferences must be an array with a maximum length of 10'
    }
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
