import _ from 'lodash';
import Promise from 'bluebird';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SetSequencerGrid from './grid';

class SetSequencer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      samples: {}
    };
  }

  componentDidMount() {
    if (this.props.set.result.tracks.length) {
      this.loadSamples()
        .then(() => {
          this.setState({
            loading: false
          });
        });
    }
  }

  loadSamples() {
    return new Promise((resolve, reject) => {
      var trackIds = Object.keys(this.props.set.meta);

      trackIds.forEach((trackId) => {
        var meta = this.props.set.meta[trackId];

        T('audio').loadthis(this.props.config.apiUrl + '/tracks/' + trackId + '.mp3', () => {
          this.state.samples[trackId] = this;

          if (trackId === trackIds[trackIds.length - 1]) {
            resolve();
          }
        }, (err) => {
          reject(err);
        });
      });
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="sequencer">
          <div className="loading">
            <i className="fa fa-spinner fa-spin"></i>
          </div>
        </div>
      );
    }
    else {
      return (
        <SetSequencerGrid set={this.props.set} />
      );
    }
  }
};

SetSequencer.propTypes = {
  set: PropTypes.object.isRequired
};

export default connect(function(state) {
  return {
    config: state.get('config')
  };
})(SetSequencer);
