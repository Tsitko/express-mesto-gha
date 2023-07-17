const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name required'],
    minLength: [2, 'min length is 2'],
    maxLength: [30, 'max length is 30'],
  },
  about: {
    type: String,
    required: [true, 'About required'],
    minLength: [2, 'min length is 2'],
    maxLength: [30, 'max length is 30'],
  },
  avatar: {
    type: String,
    required: [true, 'Avatar required'],
  },
});

module.exports = mongoose.model('users', userSchema);
