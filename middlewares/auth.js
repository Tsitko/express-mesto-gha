const jwt = require('jsonwebtoken');
const {
  ERROR_REQUEST,
  ERROR_NOT_FOUND,
  ERROR_DEFAULT,
} = require('../utils/errorCodes');

const { JWT_SECRET = 'dev-key' } = process.env;

module.exports = (req, _, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.state(ERROR_DEFAULT).send({message: 'Authorization error'});
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(res.state(ERROR_DEFAULT).send({message: 'Authorization error'}));
  }

  req.user = payload;
  return next();
};
