const express = require('express');

const {
  userValidationRules,
  validate,
} = require('../util/validators');
const fileUpload = require('../middleware/file-upload');
const usersControllers = require('../controllers/users');

const router = express.Router();

router.get('/', usersControllers.getUsers);

router.post(
  '/signup',
  fileUpload.single('image'),
  userValidationRules(),
  validate,
  usersControllers.signUp,
);

router.post('/login', usersControllers.login); //TODO add login validation

module.exports = router;
