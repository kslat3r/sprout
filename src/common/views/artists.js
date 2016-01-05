var React = require('react');
var Marty = require('marty');

var ArtistsActionCreators = require('../actions/artistsActionCreators');
var ArtistsStore = require('../stores/artistsStore');

var ArtistsComponent = require('../components/artists/artists');
var LoadingComponent = require('../components/loading');
var PageNotFoundComponent = require('../components/errors/pageNotFound');
var InternalServerErrorComponent = require('../components/errors/internalServerError');
var GenericErrorComponent = require('../components/errors/genericError');

module.exports = Marty.createContainer(ArtistsComponent, {
  listenTo: [ArtistsStore],

  componentDidMount() {
    ArtistsActionCreators.resetArtists();
  },

  fetch: {
    artists() {
      return ArtistsStore.for(this).getAll();
    }
  },

  pending() {
    return <LoadingComponent />;
  },

  failed(error) {
    switch (error.artists.status) {
      case 404:
        return <PageNotFoundComponent />
      break;
      case 500:
        return <InternalServerErrorComponent />
      break;
      default:
        return <GenericErrorComponent />
      break;
    }
  }
});