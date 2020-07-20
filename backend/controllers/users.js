const HttpError = require('../models/http-error');
const { DUMMY_USERS } = require('../dummy-data');
const User = require('../models/user');

const getUsers = (req, res, next) => {
  if (!DUMMY_USERS || DUMMY_USERS.length === 0) {
    return next(new HttpError('Could not find users', 404));
  }

  res.json({ users: DUMMY_USERS });
};

const signUp = async (req, res, next) => {
  const { name, email, password, places } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (e) {
    return next(
      new HttpError('Signing Up failed, please try again.', 500),
    );
  }

  if (existingUser) {
    return next(
      new HttpError(
        'Could not create user, email already exists.',
        422,
      ),
    );
  }

  const createdUser = new User({
    name,
    email,
    password, // TODO: Encrypt User password
    image: 'https://randomuser.me/api/portraits/men/1.jpg', // TODO: Implement file upload
    places,
  });

  try {
    await createdUser.save();
  } catch (e) {
    return next(
      new HttpError('Creating User failed, please try again.', 500),
    );
  }

  res
    .status(201)
    .json({ user: createdUser.toObject({ getters: true }) });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);

  if (!identifiedUser || identifiedUser.password !== password) {
    return next(
      new HttpError(
        'Could not identify user, credentials seem to be wrong.',
        401,
      ),
    );
  }

  res.json({ message: 'Logged in!' });
};

exports.getUsers = getUsers;
exports.signUp = signUp;
exports.login = login;
