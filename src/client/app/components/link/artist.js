import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class ArtistLink extends Component {
  render() {
    var artists = [];

    if (this.props.artist) {
      artists.push(this.props.artist);
    }
    else if (this.props.artists) {
      artists = this.props.artists;
    }

    var links = artists.map(function(artist, i) {
      var seperator;

      if (i < artists.length - 1) {
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
