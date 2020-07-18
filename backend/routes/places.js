const express = require('express');
const { check } = require('express-validator');
const placesControllers = require('../controllers/places');

const router = express.Router();

router.get('/:placeId', placesControllers.getPlaceById);

router.get('/user/:userId', placesControllers.getPlacesByUserId);

router.post(
  '/',
  [
    check('title').not().isEmpty(),
    check('description').isLength({ min: 5 }),
    check('address').not().isEmpty(),
    check('creator').not().isEmpty(),
  ],
  placesControllers.createPlace,
);

router.delete('/:placeId', placesControllers.deletePlace);

router.patch(
  '/:placeId',
  [
    check('title').not().isEmpty(),
    check('description').isLength({ min: 5 }),
  ],
  placesControllers.updatePlace,
);

module.exports = router;
