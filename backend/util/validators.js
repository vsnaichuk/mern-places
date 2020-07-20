const { body, validationResult } = require('express-validator');
const HttpError = require('../models/http-error');

const userValidationRules = () => {
  return [
    body('name').not().isEmpty(),
    body('email').normalizeEmail().isEmail(),
    body('password').isLength({ min: 5 }),
  ];
};

const createPlaceValidationRules = () => {
  return [
    body('title').not().isEmpty(),
    body('description').isLength({ min: 5 }),
    body('address').not().isEmpty(),
    body('creator').not().isEmpty(),
  ];
};

const updatePlaceValidationRules = () => {
  return [
    body('title').not().isEmpty(),
    body('description').isLength({ min: 5 }),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError('Invalid inputs passed!', 422));
  }
  next();
};

module.exports = {
  userValidationRules,
  createPlaceValidationRules,
  updatePlaceValidationRules,
  validate,
};
