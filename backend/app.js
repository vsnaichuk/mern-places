const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places');

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.use('/api/places', placesRoutes);

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json(error.message || 'An unknown error occurred!');
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
