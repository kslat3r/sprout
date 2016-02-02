import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TrackActions from '../../../actions/track';
import ArtistLink from '../../link/artist';
import SetEditorSampler from './sampler';
import SetEditorPan from './pan';
import SetEditorVolume from './volume';
import SetEditorEQ from './eq';

class SetTrack extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditName: false
    };

    this.showEditName = this.showEditName.bind(this);
    this.setName = this.setName.bind(this);
    this.saveName = this.saveName.bind(this);
  }

  componentDidUpdate() {
    if (this.refs.newName) {
      this.refs.newName.focus();
    }
  }

  showEditName() {
    this.setState({
      showEditName: true
    });
  }

  setName(e) {
    this.props.trackActions.setName(this.props.track.id, e.target.value);
  }

  saveName(e) {
    e.preventDefault();

    this.props.trackActions.updateInSet(this.props.track.id, {name: this.props.meta.get('name')});

    this.setState({
      showEditName: false
    });
  }

  render() {
    var track = this.props.track;
    var meta = this.props.meta;
    var imageSrc = '/images/thumbnail-placeholder.png';
    var sampleName;
    var pan;
    var volume;
    var eq;

    if (track.album.images[track.album.images.length - 2] && track.album.images[track.album.images.length - 2].url) {
      imageSrc = track.album.images[track.album.images.length - 2].url;
    }

    if (!this.state.showEditName) {
      sampleName = (
        <h3>
          {meta.get('name')}
          <span className="edit" onClick={this.showEditName}>
            <i className="fa fa-pencil" />
          </span>
        </h3>
      );
    }
    else {
      sampleName = (
        <form onSubmit={this.saveName} className="form-inline editName">
          <div className="form-group input-group input-group-sm">
            <input ref="newName" type="text" className="form-control" placeholder="New name" onChange={this.setName} />
          </div>
        </form>
      );
    }

    if (meta.get('hasLoaded')) {
      pan = <SetEditorPan track={track} meta={meta} />;
      volume = <SetEditorVolume track={track} meta={meta} />;
      eq = <SetEditorEQ track={track} meta={meta} />;
    }

    return (
      <div className="m-b-20 b-b-solid p-b-20 set-track col-xs-12">
        <div className="row m-b-20">
          <div className="col-xs-1 no-padding">
            <img src={imageSrc} className="img-responsive" />
          </div>
          <div className="col-xs-8">
            {sampleName}
            <h4>
              {track.name}
            </h4>
            <h5>
              <ArtistLink artists={track.artists} />
            </h5>
          </div>
          <div className="col-xs-2">
            {pan}
          </div>
          <div className="col-xs-2">
            {volume}
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <SetEditorSampler track={track} meta={meta} />
            {eq}
          </div>
        </div>
      </div>
    );
  }
};

SetTrack.propTypes = {
  track: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

export default connect(function(state) {
  return {
    sampler: state.get('sampler').toJS()
  };
}, function(dispatch) {
  return {
    trackActions: bindActionCreators(TrackActions, dispatch)
  };
}, function(stateProps, dispatchProps, ownProps) {
  return Object.assign(stateProps, dispatchProps, ownProps);
})(SetTrack);
