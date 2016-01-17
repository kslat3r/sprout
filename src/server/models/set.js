var mongoose = require('mongoose');

var setSchema = mongoose.Schema({
  name: String,
  tracks: Array,
  spotifyProfileId: String
});

module.exports = mongoose.model('Set', setSchema);