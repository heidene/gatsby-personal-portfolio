import React, { Component, Children } from 'react';
import ConnectedScrollSection from '../ScrollSection';
import PropTypes from 'prop-types';
import { VelocityComponent } from 'velocity-react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  increment,
  decrement,
  startNav,
  endNav,
  setMaxIndex,
  setVerticalScrollHeight,
} from '../../actions';

import './index.scss';

class VerticalScroller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewheight: 0,
    };
    this.vScrollerRef = React.createRef();
    this._throttledCalcDelta = _.throttle(this._calcDelta, 100);
    this._throttledScroll = _.throttle(this._scroll, 500);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.props.setVerticalScrollHeight(this.vScrollerRef.current.clientHeight);
    this.props.setMaxIndex(Children.count(this.props.children) - 1);
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.props.setVerticalScrollHeight(window.innerHeight);
    this.setState({ viewheight: window.innerHeight });
  }

  _wrapVelocityComponent = (section, index) => {
    return (
      <VelocityComponent
        key={index}
        animation={
          (this.props.scrollLocked || this.props.navigating) &&
          index === this.props.index
            ? 'scroll'
            : null
        }
        duration={1300}
        complete={() => {
          this.props.endNav();
        }}
        container={this.props.scrollLocked ? this.vScrollerRef.current : null}
      >
        <ConnectedScrollSection
          id={'scrollsection' + index}
          index={index}
          onWheel={this._wheeled}
          onTouchStart={this._handleTouchStart}
          onTouchMove={this._handleTouchMove}
          onTouchEnd={this._handleTouchEnd}
          viewheight={this.state.viewheight}
        >
          {section}
        </ConnectedScrollSection>
      </VelocityComponent>
    );
  };

  yCoord = 0;
  touchState = false;

  _handleTouchStart = (event) => {
    if (this.props.scrollLocked) {
      this.yCoord = event.touches[0].clientY;
      this.touchState = true;
    }
  };

  _calcDelta = (deltaY) => {
    if (this.touchState) {
      this._throttledScroll(deltaY);
    }
  };

  _handleTouchMove = (event) => {
    if (this.props.scrollLocked) {
      const currentYCoord = event.touches[0].clientY;
      const deltaY = this.yCoord - currentYCoord;
      this.yCoord = currentYCoord;
      event.persist();
      this._throttledCalcDelta(deltaY);
    }
  };

  _handleTouchEnd = (event) => {
    if (this.props.scrollLocked) {
      this.yCoord = 0;
      this.touchState = false;
    }
  };

  _renderSections = (sections) => {
    if (sections && typeof sections.isArray === 'undefined') {
      const renderedSections = Children.map(sections, (section, index) =>
        this._wrapVelocityComponent(section, index)
      );
      return renderedSections;
    }
    return null;
  };

  _wheeled = (e) => {
    if (this.props.scrollLocked) {
      e.stopPropagation();
      this._throttledScroll(e.deltaY);
    }
  };

  _scroll = (deltaY) => {
    if (!this.props.navigating) {
      if (deltaY > 0) {
        if (this.props.index < this.props.maxIndex) {
          this.props.startNav();
          this.props.increment();
        }
      } else {
        if (this.props.index !== 0) {
          this.props.startNav();
          this.props.decrement();
        }
      }
    }
  };

  render() {
    const { children, scrollLocked } = this.props;
    const stateClass = scrollLocked ? 'scrollLocked' : 'freescroll';
    return (
      <div ref={this.vScrollerRef} className={`verticalScroller ${stateClass}`}>
        {this._renderSections(children)}
      </div>
    );
  }
}

VerticalScroller.propTypes = {
  scrollLocked: PropTypes.bool,
  index: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  endNav: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    index: state.indexState.index,
    scrollLocked: state.ui.scrollLocked,
    maxIndex: state.indexState.maxIndex,
    navigating: state.indexState.navigating,
  };
};

export default connect(
    mapStateToProps,
    {
      increment,
      decrement,
      startNav,
      endNav,
      setMaxIndex,
      setVerticalScrollHeight,
    }
)(VerticalScroller);
