const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  ERROR_REQUEST,
  ERROR_NOT_FOUND,
  ERROR_DEFAULT,
} = require('../utils/errorCodes');


const { JWT_SECRET = 'dev-key' } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '1d' });
      res.send({ token });
    })
    .catch(() => res.status(ERROR_DEFAULT).send({ message:'Incorrect email or password'}));
};
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(ERROR_DEFAULT).send({ message: 'error' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(400)
          .send({ message: 'User id is in incorrect format' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(ERROR_NOT_FOUND).send({ message: 'User not found' });
      }
      return res.status(ERROR_DEFAULT).send({ message: 'error' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_REQUEST).send({
          message: 'Unable to create user. User data is incorrect',
        });
      }
      return res.status(ERROR_DEFAULT).send({ message: 'error' });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(ERROR_NOT_FOUND).send({
          message: 'UserNotFound',
        });
      }
      if (err.name === 'ValidationError') {
        return res.status(ERROR_REQUEST).send({
          message: 'Unable to update user. User data is incorrect',
        });
      }
      return res.status(ERROR_DEFAULT).send({ message: 'error' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(ERROR_NOT_FOUND).send({
          message: 'User Not found',
        });
      }
      if (err.name === 'ValidationError') {
        return res.status(ERROR_REQUEST).send({
          message: 'Unable to update avatar',
        });
      }
      return res.status(ERROR_DEFAULT).send({ message: 'error' });
    });
};
