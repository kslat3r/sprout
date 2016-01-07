var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

var userSchema = mongoose.Schema({
  spotifyId: String,
  accessToken: String,
  refreshToken: String,
  profile: Object
});

userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);