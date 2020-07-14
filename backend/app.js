const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places');

const app = express();
const port = 5000;

app.use('/api/places', placesRoutes);

app.listen(port, () => console.log(`App listening on port ${port}!`));
