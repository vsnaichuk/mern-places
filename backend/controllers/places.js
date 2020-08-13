const fs = require('fs');
const mongoose = require('mongoose');
const asyncHandler = require('../util/async-handler');

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
  const { title, description, address } = req.body;

  const coordinates = await getCoordsForAddress(address);

  const createdPlace = new Place({
    title,
    description,
    image: req.file.path,
    address,
    location: coordinates,
    creator: req.userData.userId,
  });

  const user = await User.findById(req.userData.userId);

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

  res.status(201).json({
    place: createdPlace,
    message: 'Successfully added a new place',
  });
});

const updatePlace = asyncHandler(async (req, res, next) => {
  const { placeId } = req.params;
  const { title, description } = req.body;

  const place = await Place.findById(placeId);

  if (place.creator.toString() !== req.userData.userId) {
    throw new HttpError(
      'You are not allowed to edit this place.',
      401,
    );
  }

  place.title = title;
  place.description = description;

  await place.save();

  res.status(200).json({
    place: place.toObject({ getters: true }),
    message: 'Successfully updated',
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

  if (place.creator.id !== req.userData.userId) {
    throw new HttpError(
      'You are not allowed to edit this place.',
      401,
    );
  }

  const imagePath = place.image;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();

    await place.deleteOne({ session: sess });
    place.creator.places.pull(place);
    place.creator.save({ session: sess });

    await sess.commitTransaction();
  } catch (err) {
    return next(
      new HttpError(
        'Something went wrong, deleting Place failed, please try again later',
        500,
      ),
    );
  }

  fs.unlink(imagePath, (err) => {
    console.log(err);
  });

  res.status(200).json({
    message: 'Successfully deleted',
  });
});

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
