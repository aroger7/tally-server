const mongoose = require('mongoose');

const AppDaySchema = new mongoose.Schema({
  appId: { type: mongoose.Schema.Types.ObjectId, ref: 'App' },
  year: Number,
  month: Number,
  day: Number,
  average: Number,
  gain: Number,
  percentGain: Number,
  counts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PlayerCount' }]
});

AppDaySchema.index({ appId: 1, year: 1, month: 1, day: 1 }, { unique: true });


const AppDay = mongoose.model('AppDay', AppDaySchema);

module.exports = AppDay;