const express = require("express");

const bodyParser = require("body-parser");

const { PORT = 3000 } = process.env;

const app = express();

const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "56e6835a91ffdc6114c728c4",
  };

  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});