import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import SetSliderTrack from './track';

export default class SetSlider extends Component {
  render() {
    var itemWidth = 160;
    var innerStyle = {
      width: ((itemWidth * this.props.set.tracks.length) - 10) + 'px'
    };

    return (
      <div className="row set-slider">
        <div className="set-slider-outer">
          <div className="set-slider-inner" style={innerStyle}>
            {this.props.set.tracks.map((track, i) => {
              return (
                <SetSliderTrack key={i} track={track} set={this.props.set} meta={this.props.set.tracksMeta[track.id]} preview={this.props.preview} link={this.props.link} />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};

SetSlider.propTypes = {
  set: PropTypes.object.isRequired,
  preview: PropTypes.bool.isRequired,
  link: PropTypes.bool.isRequired
};
