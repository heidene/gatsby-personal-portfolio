import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './index.scss';

class HamburgerButton extends Component {
  render() {
    const { open, click, heroVisible } = this.props;
    return (
      <button
        className={`hamburger-btn ${open ? 'open' : ''} ${
          heroVisible ? 'hamburger-btn--light' : ''
        }`}
        onClick={click}
      >
        <span className="hamburger-btn__line" />
        <span className="hamburger-btn__line" />
        <span className="hamburger-btn__line" />
      </button>
    );
  }
}

HamburgerButton.propTypes = {
  open: PropTypes.bool,
  heroVisible: PropTypes.bool,
  click: PropTypes.func,
};

HamburgerButton.defaultProps = {
  open: false,
  heroVisible: false,
};

const mapStateToProps = ({ ui: { heroVisible } }) => ({
  heroVisible,
});

export default connect(mapStateToProps)(HamburgerButton);
