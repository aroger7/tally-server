const mongoose = require('mongoose');

const PlayerCountSchema = new mongoose.Schema({
  appId: { type: mongoose.Types.ObjectId, index: true },
  count: Number
});

const PlayerCount = mongoose.model('PlayerCount', PlayerCountSchema);

module.exports = PlayerCount;