const express = require('express');

const {
  createPlaceValidationRules,
  updatePlaceValidationRules,
  validate,
} = require('../util/validators');
const placesControllers = require('../controllers/places');

const router = express.Router();

router.get('/:placeId', placesControllers.getPlaceById);

router.get('/user/:userId', placesControllers.getPlacesByUserId);

router.post(
  '/',
  createPlaceValidationRules(),
  validate,
  placesControllers.createPlace,
);

router.patch(
  '/:placeId',
  updatePlaceValidationRules(),
  validate,
  placesControllers.updatePlace,
);

router.delete('/:placeId', placesControllers.deletePlace);

module.exports = router;
