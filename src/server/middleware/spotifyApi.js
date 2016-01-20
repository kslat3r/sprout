var nconf = require('nconf');
var SpotifyFacade = require('../lib/spotifyFacade');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var logger = require('winston');

module.exports = function() {
  return function(req, res, next) {
    if (req.user) {
      req.spotify = new SpotifyFacade({
        clientId: nconf.get('spotify').clientID,
        clientSecret: nconf.get('spotify').clientSecret,
        spotifyProfileId: req.user.profile.id || null
      });

      req.spotify.setAccessToken(req.user.accessToken);
      req.spotify.setRefreshToken(req.user.refreshToken);

      //refresh token?

      req.spotify.getMe()
        .then(function() {
          next();
        }, function() {
          req.spotify.refreshAccessToken()
            .then(function(data) {

              //update user

              User.findOneAndUpdate({spotifyId: req.user.spotifyId}, {accessToken: data.body.access_token}, {}, function(err, FoundUser) {
                if (err) {
                  return logger.log('debug', 'Couldn\'t update user');
                }

                logger.log('debug', 'Refreshed user\'s access token');

                req.spotify.setAccessToken(data.body.access_token);
                next();
              });
            }, function(err) {
              logger.log('debug', 'Could not refresh access token', err);
              next();
            });
        }, function(err) {
          logger.log(err);
        });
    }
    else {
      next();
    }
  };
};