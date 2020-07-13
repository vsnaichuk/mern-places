const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('GET request in Places');

  req.json('It works!');
});

module.exports = router;
