import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SetLink from './link/set';
import { Link } from 'react-router';
import * as SearchActions from '../actions/search';

class Navigation extends Component {
  constructor() {
    this.searchChange = this.searchChange.bind(this);
    this.searchSubmit = this.searchSubmit.bind(this);
  }

  componentWillMount() {
    this.setState({
      searchTerm: ''
    });

    if (this.props.location.query.term) {
      this.setState({
        searchTerm: this.props.location.query.term
      });
    }
  }

  searchChange(e) {
    e.preventDefault();

    this.setState({
      searchTerm: e.target.value
    });
  }

  searchSubmit(e) {
    e.preventDefault();

    if (this.state.searchTerm !== '') {
      this.props.searchActions.update({
        term: this.state.searchTerm
      });

      this.props.history.pushState(null, '/search?term=' + this.state.searchTerm);
    }
  }

  render() {
    var setsClass,
      playlistsClass,
      artistsClass,
      albumsClass,
      tracksClass,
      isSet = false,
      sets;

    switch (this.props.routes[this.props.routes.length - 1].name) {
      case 'sets':
        setsClass = 'active';
      break;
      case 'set':
        isSet = true;
      break;
      case 'playlists':
      case 'playlist':
        playlistsClass = 'active';
      break;
      case 'artists':
      case 'artist':
        artistsClass = 'active';
      break;
      case 'albums':
      case 'album':
        albumsClass = 'active';
      break;
      case 'tracks':
        tracksClass = 'active';
      break;
    }

    if (this.props.sets.results.length > 0) {
      sets = (
        <li className={setsClass}>
          <Link to="/sets">
            <i className="fa fa-bullhorn" />
            Sets
          </Link>
          <ul>
            {this.props.sets.results.map((set, i) => {
              var className;

              if (isSet === true && this.props.set.result && this.props.set.result._id && this.props.set.result._id === set._id) {
                className = 'active';
              }

              return (
                <li key={i} className={className}>
                  <SetLink set={set}>
                    <i className="fa fa-music" />
                    {set.name}
                  </SetLink>
                </li>
              );
            })}
          </ul>
        </li>
      );
    }

    return (
      <nav className="navmenu navmenu-default navmenu-fixed-left navmenu-inverse">
        <form className="navbar-form" role="search" onSubmit={this.searchSubmit}>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Search..." value={this.state.searchTerm} onChange={this.searchChange} />
          </div>
          <button type="submit" className="btn btn-default">
            <i className="fa fa-search" />
          </button>
        </form>
        <ul className="nav navmenu-nav">
          {sets}
          <li className={playlistsClass}>
            <Link to="/playlists">
              <i className="fa fa-folder-open" />
              Playlists
            </Link>
          </li>
          <li className={artistsClass}>
            <Link to="/artists">
              <i className="fa fa-group" />
              Artists
            </Link>
          </li>
          <li className={albumsClass}>
            <Link to="/albums">
              <i className="fa fa-sticky-note" />
              Albums
            </Link>
          </li>
          <li className={tracksClass}>
            <Link to="/tracks">
              <i className="fa fa-reorder" />
              Tracks
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
};

export default connect(function(state) {
  return {
    sets: state.get('sets').toJS(),
    set: state.get('set').toJS()
  };
}, function(dispatch) {
  return {
    searchActions: bindActionCreators(SearchActions, dispatch)
  };
})(Navigation);
