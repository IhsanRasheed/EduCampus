const mongoose = require('mongoose');
const { MongoServerError } = mongoose.Error;

const handleMongoError = (err, req, res, next) => {
    if (err instanceof MongoServerError) {
      if (err.code === 11000) {
        // handle duplicate key error
        console.log('hi')
        return res.status(400).json({ message: 'Duplicate key error' });
      } else {
        // handle other MongoDB errors
        console.log('mongo error')
        return res.status(500).json({ message: 'MongoDB error' });
      }
    } else {
      // pass the error to the next middleware
      next(err);
      console.log('keri irangi')
    }
  };

  module.exports = handleMongoError