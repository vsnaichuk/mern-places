const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const placesRoutes = require('./routes/places');
const usersRoutes = require('./routes/users');
const HttpError = require('./models/http-error');

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.use('/api/places', placesRoutes);

app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  throw new HttpError('Could not find this route!', 404);
});

app.use((e, req, res, next) => {
  if (res.headersSent) {
    return next(e);
  }

  console.log(e);
  res.status(e.code || 500);
  res.json(e.message || 'An unknown error occurred!');
});

mongoose
  .connect(
    'mongodb+srv://v_snaichuk:yoWeiiGFl3fRsA45@cluster0.xfxuz.mongodb.net/mern?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
  )
  .then(() => {
    app.listen(port, () =>
      console.log(`App listening on port ${port}!`),
    );
  })
  .catch((e) => {
    console.log(e);
  });
