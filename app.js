const express = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mestodb");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "56e6835a91ffdc6114c728c4",
  };

  next();
});

module.exports = app;
