const express = require('express');
const placesControllers = require('../controllers/places');

const router = express.Router();

router.get('/:placeId', placesControllers.getPlaceById);

router.get('/user/:userId', placesControllers.getPlacesByUserId);

router.post('/', placesControllers.createPlace);

router.delete('/:placeId', placesControllers.deletePlace);

router.patch('/:placeId', placesControllers.changePlace);

module.exports = router;
