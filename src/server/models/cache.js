var mongoose = require('mongoose');

var cacheSchema = mongoose.Schema({
  key: String,
  spotifyProfileId: String,
  data: Object
});

module.exports = mongoose.model('Cache', cacheSchema);