const router = require("express").Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

router.get("/cards", getCards);
router.post("/cards", createCard);
router.delete("/cards/:cardId", deleteCard);
router.put("/:cardId/likes", likeCard);
router.delete("/:cardId/likes", dislikeCard);
