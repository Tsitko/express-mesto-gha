const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The Name field is required'],
    minlength: [2, 'The Name field length should be minimum 2 symbols'],
    maxlength: [30, 'The Name field length should be maximum 30 symbols'],
  },
  link: {
    type: String,
    required: [true, 'The Link field is required'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
