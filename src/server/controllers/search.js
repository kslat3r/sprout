var wrap = require('co-express');

module.exports = {
  index: wrap(function* (req, res) {
    var promises = [
      req.spotify.searchArtists(req.query.term, {market: req.user.profile.country || 'GB'}),
      req.spotify.searchAlbums(req.query.term, {market: req.user.profile.country || 'GB'}),
      req.spotify.searchTracks(req.query.term, {market: req.user.profile.country || 'GB'})
    ];

    try {
      var results = yield promises;
      var length = results[0].body.artists.items.length
        + results[1].body.albums.items.length
        + results[2].body.tracks.items.length;

      var out = {
        artists: results[0].body.artists,
        albums: results[1].body.albums,
        tracks: results[2].body.tracks,
        length: length
      };

      try {
        promises = [];

        out.albums.items.forEach(function(album) {
          promises.push(req.spotify.getAlbum(album.id));
        });

        results = yield promises;

        results.forEach(function(result, i) {
          out.albums.items[i].artists = result.body.artists;
        });

        res.send(out);
      }
      catch (e) {
        res.status(500).send({});
      }
    }
    catch(e) {
      res.status(500).send({});
    }
  }),

  artists: wrap(function* (req, res) {
    try {
      var result = yield req.spotify.searchArtists(req.query.term, {
        market: req.user.profile.country || 'GB',
        limit: req.query.limit,
        offset: req.query.offset
      });

      var out = {
        artists: result.body.artists,
        length: result.body.artists.items.length
      };

      res.send(out);
    }
    catch (e) {
      res.status(500).send({});
    }
  }),

  albums: wrap(function* (req, res) {
    var result = yield req.spotify.searchAlbums(req.query.term, {
      market: req.user.profile.country || 'GB',
      limit: req.query.limit,
      offset: req.query.offset
    });

    var out = {
      albums: result.body.albums,
      length: result.body.albums.items.length
    };

    var promises = [];

    out.albums.items.forEach(function(album) {
      promises.push(req.spotify.getAlbum(album.id));
    });

    var results = yield promises;

    results.forEach(function(result, i) {
      out.albums.items[i].artists = result.body.artists;
    });

    res.send(out);
  }),

  tracks: wrap(function* (req, res) {
    var result = yield req.spotify.searchTracks(req.query.term, {
      market: req.user.profile.country || 'GB',
      limit: req.query.limit,
      offset: req.query.offset
    });

    var out = {
      tracks: result.body.tracks,
      length: result.body.tracks.items.length
    };

    res.send(out);
  })
};