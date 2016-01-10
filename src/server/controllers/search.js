var wrap = require('co-express');

module.exports = {
  index: wrap(function* (req, res) {
    var promises = [
      req.spotify.searchArtists(req.query.term),
      req.spotify.searchAlbums(req.query.term),
      req.spotify.searchTracks(req.query.term)
    ];

    try {
      var results = yield promises;
      var length = results[0].body.artists.items.length
        + results[1].body.albums.items.length
        + results[2].body.tracks.items.length;

      res.send({
        artists: results[0].body.artists.items,
        albums: results[1].body.albums.items,
        tracks: results[2].body.tracks.items,
        length: length
      });
    }
    catch(e) {
      console.log(e);
    }
  })
};