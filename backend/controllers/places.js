const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../util/location');
const Place = require('../models/place');

let DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Museum of Contemporary Art Australia',
    description:
      'The Museum of Contemporary Art Australia (abbreviated MCA), located in George Street, Sydney, is an Australian museum solely dedicated to exhibiting, interpreting and collecting contemporary art, both from across Australia and around the world.',
    address: '140 George St, The Rocks NSW 2000, Australia',
    location: {
      lat: -33.8599358,
      lng: 151.2090295,
    },
    creator: 'u1',
  },
  {
    id: 'p2',
    title: 'Maidan Nezalezhnosti',
    description:
      "Maidan Nezalezhnosti is the central square of Kyiv, the capital city of Ukraine. One of the city's main squares, it is located on Khreshchatyk Street in the Shevchenko Raion",
    address: 'Kyiv 02000',
    location: {
      lat: 50.450555,
      lng: 30.5210808,
    },
    creator: 'u2',
  },
];

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
      new HttpError('Creating place failed, please try again.', 500),
    );
  }

  res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {
  const { placeId } = req.params;
  const { title, description } = req.body;

  const placeIdx = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  const updatedPlace = {
    ...DUMMY_PLACES.find((p) => p.id === placeId),
  };

  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIdx] = updatedPlace;

  res.status(200).json({
    place: updatedPlace,
  });
};

const deletePlace = (req, res, next) => {
  const { placeId } = req.params;

  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);

  if (!DUMMY_PLACES.filter((p) => p.id === placeId)) {
    throw new HttpError('Could not find place for that id!', 404);
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
