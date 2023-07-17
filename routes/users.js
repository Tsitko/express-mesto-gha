const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
} = require("../controllers/users");

const regEx = require("../constants/constants");

router.get("/users", getUsers);
router.get("/:userId", getUser);
router.post("/users", createUser);
router.patch("/users/me", updateUser);
router.patch("/users/me/avatar", updateAvatar);

module.exports = router;
