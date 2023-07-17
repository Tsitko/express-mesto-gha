const router = require("express").Router();

router.all("*", (_req, res) => {
  res.status(404).send({ message: "No such page" });
});

module.exports = router;
