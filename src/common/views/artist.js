var React = require('react');
var Marty = require('marty');
var ArtistsStore = require('../stores/artistsStore');
var NavigationActionCreators = require('../actions/navigationActionCreators');
var LoadingComponent = require('../components/loading');
var PageNotFoundComponent = require('../components/errors/pageNotFound');
var InternalServerErrorComponent = require('../components/errors/internalServerError');
var GenericErrorComponent = require('../components/errors/genericError');

var Artist = React.createClass({
  back(e) {
    e.preventDefault();

    return NavigationActionCreators.navigateHome();
  },

  render() {
    var artist = this.props.artist;

    return (
      <div>
        <h1>Artist</h1>
        <div className='artist'>{artist.name}</div>
        <a href="#" onClick={this.back.bind(this)}>Back</a>
      </div>
    );
  }
});

module.exports = Marty.createContainer(Artist, {
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