import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SetLink from './link/set';
import { Link } from 'react-router';
import * as SearchActions from '../actions/search';

export default class Header extends Component {
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

    if (this.props.sets.get('results').size) {
      seperator = <li role="separator" className="divider"></li>;
    }

    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <!-- Brand and toggle get grouped for better mobile display -->
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>

          <!-- Collect the nav links, forms, and other content for toggling -->
          <div className="collapse navbar-collapse" id="navbar-collapse">
            <ul className="nav navbar-nav">
              <li className={setsClass}>
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  Sets <span className="caret"></span>
                </a>
                <ul className="dropdown-menu">
                  {this.props.sets.get('results').map((set, i) => {
                    return (
                      <li key={i}>
                        <SetLink set={set}>
                          {set.get('name')}
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

            <form className="navbar-form navbar-right" role="search" onSubmit={this.searchSubmit}>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Search for an album/artist/track" value={this.state.searchTerm} onChange={this.searchChange} />
              </div>
              <button type="submit" className="btn btn-default">
                <i className="fa fa-search" />
              </button>
            </form>
          </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
      </nav>
    );
  }
};

export default connect(function(state) {
  return {
    sets: state.get('sets'),
    effects: state.get('effects')
  };
}, function(dispatch) {
  return {
    searchActions: bindActionCreators(SearchActions, dispatch)
  };
})(Header);
