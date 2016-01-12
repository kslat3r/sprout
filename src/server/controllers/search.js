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

      var out = {
        artists: results[0].body.artists.items,
        albums: results[1].body.albums.items,
        tracks: results[2].body.tracks.items,
        length: length
      };

      try {
        promises = [];

        out.albums.forEach(function(album) {
          promises.push(req.spotify.getAlbum(album.id));
        });

        results = yield promises;

        results.forEach(function(result, i) {
          out.albums[i].artists = result.body.artists;
        });

        res.send(out);
      }
      catch (e) {
        console.log(e);
      }
    }
    catch(e) {
      console.log(e);
    }
  })
};