const asyncHandler = require('express-async-handler');
const HttpError = require('../models/http-error');
const User = require('../models/user');
// const { DUMMY_PLACES } = require('../dummy-data');

const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({}, '-password');

  if (!users || users.length === 0) {
    throw new HttpError('Could not find users', 404);
  }

  res.json({
    users: users.map((u) => u.toObject({ getters: true })),
  });
});

const signUp = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    throw new HttpError(
      'Could not create user, email already exists.',
      422,
    );
  }

  const createdUser = new User({
    name,
    email,
    password, // TODO: Encrypt User password
    image: 'https://randomuser.me/api/portraits/men/1.jpg', // TODO: Implement file upload
    places: [],
  });

  await createdUser.save();

  res.status(201).json({
    user: createdUser.toObject({ getters: true }),
    message: 'Account has been successfully created.',
  });
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email: email });

  if (!existingUser || existingUser.password !== password) {
    throw new HttpError(
      'Could not identify user, credentials seem to be wrong.',
      401,
    );
  }

  res.json({ message: 'Logged in!' });
});

exports.getUsers = getUsers;
exports.signUp = signUp;
exports.login = login;
