import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import SetLink from '../../link/set';
import SetTrack from './track';

export default class SetListRow extends Component {
  render() {
    var itemWidth = 160;
    var innerStyle = {
      width: ((itemWidth * this.props.set.tracks.length) - 10) + 'px'
    };

    return (
      <div className="row">
        <SetLink set={this.props.set}>
          <h2>{this.props.set.name}</h2>
        </SetLink>
        <div className="set-row-outer">
          <div className="set-row-inner" style={innerStyle}>
            {this.props.set.tracks.map((track, i) => {
              return (
                <SetTrack key={i} track={track} />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};

SetListRow.propTypes = {
  set: PropTypes.object.isRequired
};
