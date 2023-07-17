const Card = require("../models/card");

const getCards = (_, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send({ data: cards });
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  return Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(201).send({ data: card });
    })
    .catch((err) => {
      return next(err);
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card.owner.equals(req.user._id)) {
        return card.remove().then(() => res.send({ data: card }));
      }
    })
    .catch((err) => {
      return next(err);
    });
};

const likeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  );

const dislikeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  );

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
