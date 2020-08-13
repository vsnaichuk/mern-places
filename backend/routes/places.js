const express = require('express');

const {
  createPlaceValidationRules,
  updatePlaceValidationRules,
  validate,
} = require('../util/validators');
const fileUpload = require('../middleware/file-upload');
const checkAuth = require('../middleware/check-auth');
const placesControllers = require('../controllers/places');

const router = express.Router();

router.get('/:placeId', placesControllers.getPlaceById);

router.get('/user/:userId', placesControllers.getPlacesByUserId);

router.use(checkAuth);

router.post(
  '/',
  fileUpload.single('image'),
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
