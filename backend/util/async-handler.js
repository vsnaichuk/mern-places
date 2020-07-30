const HttpError = require('../models/http-error');

const asyncHandler = (fn) =>
  function asyncUtilWrap(...args) {
    const fnReturn = fn(...args);

    const next = args[args.length - 1];

    return Promise.resolve(fnReturn).catch((e) => {
      console.log(e);
      let message;

      if (e.name === 'ValidationError') {
        message = 'Database Validation Error';
      }
      if (e.name === 'MongoError') {
        message = 'Database Error';
      }
      if (e.name === 'MongooseServerSelectionError') {
        message = 'Could not connect to Database';
      }

      if (message) {
        return next(new HttpError(message, 500));
      }

      return next(e);
    });
  };

module.exports = asyncHandler;
