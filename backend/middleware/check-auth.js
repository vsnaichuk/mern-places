const jwt = require('jsonwebtoken');
const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; //Authorization: 'Bearer TOKEN'

    if (!token) {
      throw new Error('Authorization failed!');
    }

    const decodedToken = jwt.verify(token, 'super_secret_dont_share');
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    return next(new HttpError('Authorization failed!', 403));
  }
};
