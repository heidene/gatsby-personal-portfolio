import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../Nav';

import './index.scss';
import Logo from './../../svgs/Logo_NV_Web.svg';

class Header extends Component {
  initialRender = true;

  componentDidMount(props) {
    this.initialRender = false;
  }

  renderLogo(heroVisible) {
    let className = 'headerTitle';
    if (!this.initialRender) {
      if (!heroVisible) {
        className += ' fadeIn';
      } else {
        className += ' fadeOut';
      }
    }
    return (
      <Fragment>
        <span className={className}>
          <Logo className={`app-logo`} aria-label="logo" />
          ico Vandenhove
        </span>
      </Fragment>
    );
  }

  render() {
    const { heroVisible, sections } = this.props;

    return (
      <header className={`${heroVisible ? 'header--hide' : ''}`}>
        {this.renderLogo(heroVisible)}
        <Navbar sections={sections} />
      </header>
    );
  }
}

Header.propTypes = {
  heroVisible: PropTypes.bool,
  sections: PropTypes.array.isRequired,
};

const mapStateToProps = ({ ui: { heroVisible } }) => {
  return { heroVisible };
};

export default connect(mapStateToProps)(Header);
