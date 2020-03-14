const mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
}

module.exports = {
  mongoose
};