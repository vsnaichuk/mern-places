const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const placesRoutes = require('./routes/places');
const usersRoutes = require('./routes/users');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

const corsOpt = {
  origin: process.env.CORS_ALLOW_ORIGIN || '*',
  methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOpt));
app.options('*', cors(corsOpt));

app.use('/api/places', placesRoutes);

app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  throw new HttpError('Could not find this route!', 404);
});

app.use((error, req, res, next) => {
  // TODO: AWS delete file if err

  if (res.headersSent) {
    return next(error);
  }

  console.log(error);
  res.status(error.code || 500);
  res.json(error.message || 'An unknown error occurred!');
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xfxuz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
  )
  .then(() => {
    app.listen(PORT, () =>
      console.log(`App listening on port ${PORT}!`),
    );
  })
  .catch((e) => {
    console.log(e);
  });
