var React = require('react');
var Marty = require('marty');

var ArtistsStore = require('../stores/artistsStore');

var ArtistComponent = require('../components/artists/artist');
var LoadingComponent = require('../components/loading');
var PageNotFoundComponent = require('../components/errors/pageNotFound');
var InternalServerErrorComponent = require('../components/errors/internalServerError');
var GenericErrorComponent = require('../components/errors/genericError');

module.exports = Marty.createContainer(ArtistComponent, {
  listenTo: [ArtistsStore],

  fetch: {
    artist() {
      return ArtistsStore.for(this).getById(this.props.id);
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