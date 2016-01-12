import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class ArtistLink extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artists: []
    };

    if (this.props.artist) {
      this.state.artists.push(this.props.artist);
    }
    else if (this.props.artists) {
      this.state.artists = this.props.artists;
    }
  }

  render() {
    var links = this.state.artists.map(function(artist, i) {
      var seperator;

      if (i < this.state.artists.length - 1) {
        seperator = <span>,&nbsp;</span>;
      }

      var children = artist.name;

      if (this.props.children) {
        children = this.props.children;
      }

      return (
        <span key={i}>
          <Link to={`/artists/${artist.id}`}>
            {children}
          </Link>
          {seperator}
        </span>
      );
    }.bind(this));

    return <span>{links}</span>;
  }
};

ArtistLink.propTypes = {
  artists: PropTypes.array,
  artist: PropTypes.object
};