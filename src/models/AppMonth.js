const mongoose = require('mongoose');

const AppMonthSchema = new mongoose.Schema({
  appId: { type: mongoose.Types.ObjectId, ref: 'App' },
  year: Number,
  month: Number,
  average: Number,
  gain: Number,
  percentGain: Number
});

AppMonthSchema.index({ appId: 1, year: 1, month: 1 }, { unique: true });

const AppMonth = mongoose.model('AppMonth', AppMonthSchema);

module.exports = AppMonth;