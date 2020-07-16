const express = require('express');
const HttpError = require('../models/http-error');
const placesControllers = require('../controllers/places');

const router = express.Router();

router.get('/:placeId', placesControllers.getPlaceById);

router.get('/user/:userId', placesControllers.getPlacesByUserId);

router.post('/', placesControllers.createPlace);

module.exports = router;
