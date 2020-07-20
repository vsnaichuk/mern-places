const express = require('express');

const {
  userValidationRules,
  validate,
} = require('../util/validators');
const usersControllers = require('../controllers/users');

const router = express.Router();

router.get('/', usersControllers.getUsers);

router.post(
  '/signup',
  userValidationRules(),
  validate,
  usersControllers.signUp,
);

router.post('/login', usersControllers.login);

module.exports = router;
