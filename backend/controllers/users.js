const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../util/async-handler');
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

  const hashedPassword = await bcrypt.hash(password, 12);

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    image: req.file.path,
    places: [],
  });

  await createdUser.save();

  const token = jwt.sign(
    {
      userId: createdUser.id,
      email: createdUser.email,
    },
    'super_secret_dont_share',
    {
      expiresIn: '1h',
    },
  );

  res.status(201).json({
    user: {
      id: createdUser.id,
      email: createdUser.email,
      token,
    },
    message: 'Account has been successfully created.',
  });
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email: email });

  if (!existingUser) {
    throw new HttpError(
      'Could not log you in, credentials seem to be wrong.',
      401,
    );
  }

  const isValidPassword = bcrypt.compare(
    password,
    existingUser.password,
  );

  if (!isValidPassword) {
    throw new HttpError(
      'Invalid credentials, could not log you in.',
      401,
    );
  }

  const token = jwt.sign(
    {
      userId: existingUser.id,
      email: existingUser.email,
    },
    'super_secret_dont_share',
    {
      expiresIn: '1h',
    },
  );

  res.json({
    user: {
      id: existingUser.id,
      email: existingUser.email,
      token,
    },
    message: 'Logged in!',
  });
});

exports.getUsers = getUsers;
exports.signUp = signUp;
exports.login = login;
