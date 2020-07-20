const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../util/location');
// const { DUMMY_PLACES } = require('../dummy-data');
const Place = require('../models/place');

const getPlaceById = async (req, res, next) => {
  const { placeId } = req.params;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (e) {
    return next(
      new HttpError(
        'Something went wrong, could not find place.',
        500,
      ),
    );
  }

  if (!place) {
    return next(
      new HttpError('Could not find place for the provided id', 404),
    );
  }

  res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
  const { userId } = req.params;

  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (e) {
    return next(
      new HttpError(
        'Fetching places failed, please try again later.',
        500,
      ),
    );
  }

  if (!places || places.length === 0) {
    return next(
      new HttpError(
        'Could not find places for the provided user id',
        404,
      ),
    );
  }

  res.json({
    places: places.map((p) => p.toObject({ getters: true })),
  });
};

const createPlace = async (req, res, next) => {
  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (e) {
    return next(e);
  }

  const createdPlace = new Place({
    title,
    description,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/b/b9/MaidanNezalezhnosti.jpg', // TODO Implement file upload
    address,
    location: coordinates,
    creator,
  });

  try {
    await createdPlace.save();
  } catch (e) {
    return next(
      new HttpError(
        'Creating Place failed, please try again later.',
        500,
      ),
    );
  }

  res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
  const { placeId } = req.params;
  const { title, description } = req.body;

  let place;
  try {
    place = await Place.findById(placeId);

    place.title = title;
    place.description = description;

    await place.save();
  } catch (e) {
    return next(
      new HttpError(
        'Something went wrong, updating Place failed, please try again later',
        500,
      ),
    );
  }

  res.status(200).json({
    place: place.toObject({ getters: true }),
  });
};

const deletePlace = async (req, res, next) => {
  const { placeId } = req.params;

  let place;
  try {
    place = await Place.findById(placeId);

    await place.deleteOne();
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
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
