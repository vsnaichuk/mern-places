const axios = require('axios');
const HttpError = require('../models/http-error');

const API_KEY = 'AIzaSyCVc33rb2BeJD8NT69Ih0jZgPA1alq_-qQ';

const getCoordsForAddress = async (address) => {
  const res = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address,
    )}&key=${API_KEY}`,
  );

  const { data } = res;

  if (!data || data === 'ZERO_RESULTS') {
    throw new HttpError(
      'Could not find location for the specified address.',
      422,
    );
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
};

module.exports = getCoordsForAddress;
