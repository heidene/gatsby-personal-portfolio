import React from 'react';
import PropTypes from 'prop-types';
import VisibilitySensor from 'react-visibility-sensor';
import { connect } from 'react-redux';
import { setIndex } from '../../actions';

import './index.scss';

class ScrollSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      content: this.props.content,
      onWheel: this.props.onWheel,
      index: this.props.index,
      viewheight: 2000,
      setIndex: this.props.setIndex,
      navigating: this.props.navigating,
      classes: this.props.classes,
    };
    this._onChange = this._onChange.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ viewheight: window.innerHeight });
  }

  _onChange(isVisible) {
    if (isVisible && !this.state.navigating) {
      this.state.setIndex(this.state.index);
    }
  }

  componentWillReceiveProps(props) {
    this.setState({ navigating: props.navigating });
  }

  render() {
    const { children, onTouchStart, onTouchMove, onTouchEnd } = this.props;
    return (
      <VisibilitySensor
        onChange={this._onChange}
        scrollCheck={true}
        partialVisibility={true}
        offset={{
          top: this.state.viewheight / 2,
          bottom: this.state.viewheight / 2,
        }}
      >
        <div
          id={this.state.id}
          className="parallax"
          onWheel={this.state.onWheel}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="fullscreenContent">{children}</div>
        </div>
      </VisibilitySensor>
    );
  }
}

ScrollSection.propTypes = {
  onWheel: PropTypes.func.isRequired,
  setIndex: PropTypes.func.isRequired,
  navigating: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ indexState: { navigating } }) => {
  return { navigating };
};

export default connect(
    mapStateToProps,
    { setIndex }
)(ScrollSection);
