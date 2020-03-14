const mongoose = require('mongoose');

const AppYearSchema = new mongoose.Schema({
  appId: { type: mongoose.Types.ObjectId, ref: 'App' },
  year: Number,
  average: Number,
  gain: Number,
  percentGain: Number
});

AppYearSchema.index({ appId: 1, timezoneId: 1, year: 1 }, { unique: true });

const AppYear = mongoose.model('AppYear', AppYearSchema);

module.exports = AppYear;