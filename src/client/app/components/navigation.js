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
    var setsClass = 'dropdown',
      playlistsClass,
      artistsClass,
      albumsClass,
      tracksClass,
      seperator;

    switch (this.props.routes[this.props.routes.length - 1].name) {
      case 'sets':
      case 'set':
        setsClass += ' active';
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

    if (this.props.sets.results.length) {
      seperator = <li role="separator" className="divider"></li>;
    }

    return (
      <nav className="navmenu navmenu-default navmenu-fixed-left navmenu-inverse">
        <form className="navbar-form" role="search" onSubmit={this.searchSubmit}>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Search for an album/artist/track" value={this.state.searchTerm} onChange={this.searchChange} />
          </div>
          <button type="submit" className="btn btn-default">
            <i className="fa fa-search" />
          </button>
        </form>
        <ul className="nav navmenu-nav">
          <li className={setsClass}>
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
              Sets <span className="caret"></span>
            </a>
            <ul className="dropdown-menu">
              {this.props.sets.results.map((set, i) => {
                return (
                  <li key={i}>
                    <SetLink set={set}>
                      {set.name}
                    </SetLink>
                  </li>
                );
              })}
              {seperator}
              <li>
                <Link to="/sets">View all sets</Link>
              </li>
            </ul>
          </li>
          <li className={playlistsClass}><Link to="/playlists">Playlists</Link></li>
          <li className={artistsClass}><Link to="/artists">Artists</Link></li>
          <li className={albumsClass}><Link to="/albums">Albums</Link></li>
          <li className={tracksClass}><Link to="/tracks">Tracks</Link></li>
        </ul>
      </nav>
    );
  }
};

export default connect(function(state) {
  return {
    sets: state.get('sets').toJS()
  };
}, function(dispatch) {
  return {
    searchActions: bindActionCreators(SearchActions, dispatch)
  };
})(Navigation);
