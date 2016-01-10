var nconf = require('nconf');
var Spotify = require('spotify-web-api-node');

module.exports = function() {
  return function(req, res, next) {
    if (req.user) {
      req.spotify = new Spotify({
        clientId: nconf.get('spotify').clientID,
        clientSecret: nconf.get('spotify').clientSecret
      });

      req.spotify.setAccessToken(req.user.accessToken);
    }

    next();
  };
};