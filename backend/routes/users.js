const express = require('express');
const { check } = require('express-validator');
const usersControllers = require('../controllers/users');

const router = express.Router();

router.get('/', usersControllers.getUsers);

router.post(
  '/signup',
  [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 5 }),
  ],
  usersControllers.signUp,
);

router.post('/login', usersControllers.login);

module.exports = router;
