const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const getCoordsForAddress = require('../util/location');
const HttpError = require('../models/http-error');
const Place = require('../models/place');
const User = require('../models/user');
// const { DUMMY_PLACES } = require('../dummy-data');

const getPlaceById = asyncHandler(async (req, res, next) => {
  const { placeId } = req.params;

  const place = await Place.findById(placeId);

  if (!place) {
    throw new HttpError(
      'Could not find place for the provided id',
      404,
    );
  }

  res.json({ place: place.toObject({ getters: true }) });
});

const getPlacesByUserId = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  const places = await Place.find({ creator: userId });

  if (!places || places.length === 0) {
    throw new HttpError(
      'Could not find places for the provided user id',
      404,
    );
  }

  res.json({
    places: places.map((p) => p.toObject({ getters: true })),
  });
});

const createPlace = asyncHandler(async (req, res, next) => {
  const { title, description, address, creator } = req.body;

  const coordinates = await getCoordsForAddress(address);

  const createdPlace = new Place({
    title,
    description,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/b/b9/MaidanNezalezhnosti.jpg', // TODO Implement file upload
    address,
    location: coordinates,
    creator,
  });

  const user = await User.findById(creator);

  if (!user) {
    throw new HttpError('Could not find User for provided id.', 404);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();

    await createdPlace.save({ session: sess });
    user.places.push(createdPlace);
    await user.save({ session: sess });

    await sess.commitTransaction();
  } catch (err) {
    throw new HttpError(
      'Creating place failed, please try again later.',
      500,
    );
  }

  res.status(201).json({ place: createdPlace });
});

const updatePlace = asyncHandler(async (req, res, next) => {
  const { placeId } = req.params;
  const { title, description } = req.body;

  const place = await Place.findById(placeId);

  if (!place) {
    throw new HttpError(
      'Could not find place for the provided id',
      404,
    );
  }

  place.title = title;
  place.description = description;

  await place.save();

  res.status(200).json({
    place: place.toObject({ getters: true }),
  });
});

const deletePlace = asyncHandler(async (req, res, next) => {
  const { placeId } = req.params;

  const place = await Place.findById(placeId).populate('creator');

  if (!place) {
    throw new HttpError(
      'Could not find place for the provided id',
      404,
    );
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();

    await place.deleteOne({ session: sess });
    place.creator.places.pull(place);
    place.creator.save({ session: sess });

    await sess.commitTransaction();
  } catch (e) {
    return next(
      new HttpError(
        'Something went wrong, deleting Place failed, please try again later',
        500,
      ),
    );
  }

  res.status(200).json({
    message: 'Successfully deleted',
  });
});

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
