var React = require('react');
var Marty = require('Marty');

var SearchResultsComponent = require('./searchResults')

var SearchActionCreators = require('../../actions/searchActionCreators');
var SearchStore = require('../../stores/searchStore');

module.exports = Marty.createContainer(React.createClass({
  getInitialState() {
    return {
      searchTerm: '',
      searchResults: {
        albums: [],
        artists: [],
        tracks: [],
        numResults: 0
      }
    };
  },

  handleChange(key, e) {
    var nextState = {};

    nextState[key] = e.target.value;
    this.setState(nextState);
  },

  submit(e) {
    e.preventDefault();

    if (this.state.searchTerm !== '') {
      SearchActionCreators.reset();
      SearchActionCreators.search(this.state);
    }
  },

  render() {
    return (
      <div>
        <form className="form-inline" onSubmit={this.submit}>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Search for an album/artist/track" onChange={this.handleChange.bind(this, 'searchTerm')} />
          </div>
          <button type="submit" className="btn btn-success">Search</button>
        </form>
        <div className="row">
          <div className="col-xs-12">
            <SearchResultsComponent type="albums" searchResults={this.state.searchResults.albums} />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <SearchResultsComponent type="artists" searchResults={this.state.searchResults.artists} />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <SearchResultsComponent type="tracks" searchResults={this.state.searchResults.tracks} />
          </div>
        </div>
      </div>
    );
  }
}), {
  listenTo: [SearchStore]
});