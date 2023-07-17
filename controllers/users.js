const User = require("../models/user");

const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        console.log("User not found");
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        console.log("Wrond Id");
      }
      return next(err);
    });
};

const getUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      if (!users) {
        throw new NotFoundError("No users found");
      }
      return res.status(200).sent({ data: users });
    })
    .catch((err) => next(err));
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({
    name,
    about,
    avatar,
  })
    .then((user) => {
      res.status(201).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      });
    })
    .catch((err) => {
      return next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(req.user._id, {
    name,
    about,
  })
    .then((user) => {
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      return next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, {
    avatar,
  })
    .then((user) => {
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      return next(err);
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
