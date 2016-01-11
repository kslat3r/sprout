var nconf = require('nconf');
var Spotify = require('spotify-web-api-node');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function() {
  return function(req, res, next) {
    if (req.user) {
      req.spotify = new Spotify({
        clientId: nconf.get('spotify').clientID,
        clientSecret: nconf.get('spotify').clientSecret
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
                  return console.log('Couldn\'t update user');
                }

                req.spotify.setAccessToken(FoundUser.get('accessToken'));
                next();
              });
            }, function(err) {
              console.log('Could not refresh access token', err);
              next();
            });
        });
    }
  };
};