var mongoose = require('mongoose');

var setSchema = mongoose.Schema({
  name: String,
  tracks: Array,
  samples: Object
});

module.exports = mongoose.model('Set', setSchema);