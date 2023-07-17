const Card = require('../models/card');

module.exports.getCards = (_req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'error' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Unable to create card. Card data is incorrect',
        });
      }
      return res.status(500).send({ message: 'error' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({
          message: 'No cards found',
        });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'Incorrect like data',
        });
      }
      return res.status(500).send({ message: 'error' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({
          message: 'Card not found',
        });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'Incorrect dislike data',
        });
      }
      return res.status(500).send({ message: 'error' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({
          message: 'No cards found',
        });
      }
      if (err.name === 'CastError') {
        res
          .status(400)
          .send({ message: 'Unable to delete card. Card data incorrect' });
      }
      return res.status(500).send({ message: 'error' });
    });
};
