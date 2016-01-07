var nconf = require('nconf');
var mongoose = require('mongoose');
var passport = require('passport');
var SpotifyStrategy = require('passport-spotify').Strategy;
var User = mongoose.model('User');

passport.serializeUser(function(user, done) {
  done(null, user.spotifyId);
});

passport.deserializeUser(function(id, done) {
  User.findOne({spotifyId: id}, function(err, foundUser) {
    done(err, foundUser);
  });
});

passport.use(new SpotifyStrategy({
  clientID: nconf.get('spotify').clientID,
  clientSecret: nconf.get('spotify').clientSecret,
  callbackURL: nconf.get('spotify').callbackURL
}, function(accessToken, refreshToken, profile, done) {
  var userObj = {
    spotifyId: profile.id,
    accessToken: accessToken,
    refreshToken: refreshToken,
    profile: profile
  };

  User.findOrCreate({spotifyId: profile.id}, userObj, function(err, NewOrFoundUser) {
    done(err, NewOrFoundUser);
  });
}));