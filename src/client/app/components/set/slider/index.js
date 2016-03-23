import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import SetSliderTrack from './track';

export default class SetSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      closed: this.props.closed
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      closed: !this.state.closed
    });
  }

  render() {
    var items = this.props.set.result !== undefined ? this.props.set.result.tracks : this.props.set.tracks;
    var length = this.props.set.result !== undefined ? this.props.set.result.tracks.length : this.props.set.tracks.length;
    var meta;

    var itemWidth = 160;
    var innerStyle = {
      width: (itemWidth * length - 10) + 'px'
    };

    var className = 'row set-slider';
    var toggleHandle;
    var slider;

    if (this.props.hasToggle) {
      var icon;

      if (this.state.closed) {
        icon = (
          <i className="fa fa-chevron-left" />
        );
      }
      else {
        icon = (
          <i className="fa fa-chevron-right" />
        );
      }

      toggleHandle = (
        <div className="toggleHandle" onClick={this.toggle}>
          {icon}
        </div>
      );
    }

    if (!this.state.closed) {
      slider = (
        <div className="set-slider-outer">
          <div className="set-slider-inner" style={innerStyle}>
            {items.map((track, i) => {
              meta = this.props.set.meta[track.id];

              return (
                <SetSliderTrack key={i} track={track} set={this.props.set} meta={meta} preview={this.props.preview} link={this.props.link} />
              );
            })}
          </div>
        </div>
      );
    }
    else {
      className += ' closed';
    }

    return (
      <div className={className}>
        {toggleHandle}
        {slider}
      </div>
    );
  }
};

SetSlider.propTypes = {
  set: PropTypes.object.isRequired,
  preview: PropTypes.bool.isRequired,
  link: PropTypes.bool.isRequired,
  hasToggle: PropTypes.bool,
  closed: PropTypes.bool
};
