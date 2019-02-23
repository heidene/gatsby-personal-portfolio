import React, { Component, Children } from 'react';
import ConnectedScrollSection from '../ScrollSection';
import PropTypes from 'prop-types';
import { VelocityComponent } from 'velocity-react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import { increment, decrement, endNav, setMaxIndex } from '../../actions';

import './index.scss';

class VerticalScroller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: props.sections,
      scrollLocked:
        typeof props.scrollLocked !== 'undefined' ? props.scrollLocked : true,
      done: true,
      lastScrolled: {},
      currentIndex: props.index,
      wheel: false,
      parentNode: null,
      increment: props.increment,
      decrement: props.decrement,
      endNav: props.endNav,
      maxIndex: props.maxIndex,
    };
    this._renderSections = this._renderSections.bind(this);
    this._wheeled = this._wheeled.bind(this);
    this._scroll = this._scroll.bind(this);
    this._wrapVelocityComponent = this._wrapVelocityComponent.bind(this);
    this._resetPosition = this._resetPosition.bind(this);
    this._throttledCalcDelta = _.throttle(this._calcDelta, 100);
  }

  _resetPosition() {
    this.forceUpdate();
  }

  componentDidMount() {
    const parentNode = ReactDOM.findDOMNode(this);
    if (window) window.addEventListener('resize', this._resetPosition);
    this.setState({ parentNode: parentNode });
    this.props.setMaxIndex(Children.count(this.props.children) - 1);
  }

  componentWillUnmount() {
    if (window) window.removeEventListener('resize', this._resetPosition);
  }

  _wrapVelocityComponent(section, index) {
    return (
      <VelocityComponent
        key={index}
        animation={
          (this.state.scrollLocked || this.state.navigating) &&
          index === this.state.currentIndex
            ? 'scroll'
            : null
        }
        duration={1300}
        complete={() => {
          this.setState({ done: true });
          this.state.endNav();
        }}
        container={this.state.parentNode}
      >
        <ConnectedScrollSection
          id={'scrollsection' + index}
          index={index}
          onWheel={this._wheeled}
          onTouchStart={this._handleTouchStart}
          onTouchMove={this._handleTouchMove}
          onTouchEnd={this._handleTouchEnd}
        >
          {section}
        </ConnectedScrollSection>
      </VelocityComponent>
    );
  }

  yCoord = 0;
  touchState = false;

  _handleTouchStart = (event) => {
    if (this.state.scrollLocked) {
      console.log('TOUCH START');
      this.yCoord = event.touches[0].clientY;
      this.touchState = true;
    }
  };

  _calcDelta = (event, yCoord) => {
    const currentYCoord = event.touches[0].clientY;
    const deltaY = yCoord - currentYCoord;
    console.log(yCoord, ' - ', currentYCoord, ' = ', deltaY);
    this.yCoord = currentYCoord;
    if (this.touchState) {
      this._scroll(deltaY);
    }
  };

  _handleTouchMove = (event) => {
    if (this.state.scrollLocked) {
      event.persist();
      this._throttledCalcDelta(event, this.yCoord);
      // if (this.yCoord > currentYCoord + 5) {
      // } else if (this.yCoord < currentYCoord - 5) {
      // }
    }
  };

  _handleTouchEnd = (event) => {
    if (this.state.scrollLocked) {
      console.log('TOUCH END');
      this.yCoord = 0;
      this.touchState = false;
    }
  };

  _renderSections(sections) {
    if (sections && typeof sections.isArray === 'undefined') {
      const renderedSections = Children.map(sections, (section, index) =>
        this._wrapVelocityComponent(section, index)
      );
      return renderedSections;
    }
    return null;
  }

  _wheeled(e) {
    if (this.state.scrollLocked) {
      e.stopPropagation();
      this._scroll(e.deltaY);
    }
  }

  _scroll(deltaY) {
    if (this.state.done) {
      let done = false;
      let nextIndex = this.state.currentIndex;
      if (deltaY > 0) {
        if (this.state.currentIndex < this.state.maxIndex) {
          ++nextIndex;
          this.state.increment();
        } else {
          done = true;
        }
      } else {
        if (this.state.currentIndex !== 0) {
          --nextIndex;
          this.state.decrement();
        } else {
          done = true;
        }
      }
      this.setState({
        done: done,
        // lastScrolled: e.target.parentNode.id,
        currentIndex: nextIndex,
      });
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      currentIndex: props.index,
      maxIndex: props.maxIndex,
      scrollLocked: props.scrollLocked,
      navigating: props.navigating,
    });
  }

  render() {
    const stateClass = this.state.scrollLocked ? 'scrollLocked' : 'freescroll';
    const { children } = this.props;
    return (
      <div className={`verticalScroller ${stateClass}`}>
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
    { increment, decrement, endNav, setMaxIndex }
)(VerticalScroller);
