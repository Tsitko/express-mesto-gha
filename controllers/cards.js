const Card = require('../models/card');
const {
  ERROR_REQUEST,
  ERROR_NOT_FOUND,
  ERROR_DEFAULT,
} = require('../utils/errorCodes');

module.exports.getCards = (_req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(ERROR_DEFAULT).send({ message: 'error' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_REQUEST).send({
          message: 'Unable to create card. Card data is incorrect',
        });
      }
      return res.status(ERROR_DEFAULT).send({ message: 'error' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(ERROR_NOT_FOUND).send({
          message: 'No cards found',
        });
      }
      if (err.name === 'CastError') {
        return res.status(ERROR_REQUEST).send({
          message: 'Incorrect like data',
        });
      }
      return res.status(ERROR_DEFAULT).send({ message: 'error' });
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
        return res.status(ERROR_NOT_FOUND).send({
          message: 'Card not found',
        });
      }
      if (err.name === 'CastError') {
        return res.status(ERROR_REQUEST).send({
          message: 'Incorrect dislike data',
        });
      }
      return res.status(ERROR_DEFAULT).send({ message: 'error' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(ERROR_NOT_FOUND).send({
          message: 'No cards found',
        });
      }
      if (err.name === 'CastError') {
        return res
          .status(ERROR_REQUEST)
          .send({ message: 'Unable to delete card. Card data incorrect' });
      }
      return res.status(ERROR_DEFAULT).send({ message: 'error' });
    });
};
