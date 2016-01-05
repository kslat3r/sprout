var _ = require('lodash');
var React = require('react');
var Marty = require('marty');
var ArtistsActionCreators = require('../actions/artistsActionCreators');
var NavigationActionCreators = require('../actions/navigationActionCreators');
var ArtistsStore = require('../stores/artistsStore');
var LoadingComponent = require('../components/loading');
var PageNotFoundComponent = require('../components/errors/pageNotFound');
var InternalServerErrorComponent = require('../components/errors/internalServerError');
var GenericErrorComponent = require('../components/errors/genericError');

var Artists = React.createClass({
  navigateToArtist(id, e) {
    e.preventDefault();

    return NavigationActionCreators.navigateToArtist(id);
  },

  render() {
    var artists = this.props.artists;

    var items = _.map(artists, (artist) => {
      return (
        <li>
          <a href="#" onClick={this.navigateToArtist.bind(this, artist.id)}>{artist.name}</a>
        </li>
      );
    });

    return (
      <div>
        <h1>Artists</h1>
        <div className='artists'>
          <ul>{items}</ul>
        </div>
      </div>
    );
  }
});

module.exports = Marty.createContainer(Artists, {
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