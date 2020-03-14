const mongoose = require('mongoose');

const AppSchema = new mongoose.Schema({
  appId: { type: Number, unique: true },
  name: String,
  current: Number,
  average: Number,
  average24Hours: Number,
  peak: Number,
  peak24Hours: Number
});

const App = mongoose.model('App', AppSchema);

module.exports = App;