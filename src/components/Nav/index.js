import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withSizes from 'react-sizes';
import HorizontalNav from '../HorizontalNav';
import HamburgerButton from '../HamburgerButton';
import SideDrawer from '../SideDrawer';
import Backdrop from '../Backdrop';

import './index.scss';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  _openSideDraw = (openBool) => {
    this.setState((prevState) => {
      return { open: !prevState.open };
    });
  };

  _handelHideBar = () => {
    this.setState((prevState) => {
      return { open: !prevState.open };
    });
  };

  _backdropClickHandler = () => {
    this.setState({ open: false });
  };

  render() {
    const { isMobile, sections } = this.props;
    const { open } = this.state;
    const nav = isMobile ? (
      <Fragment>
        <HamburgerButton click={this._openSideDraw} open={open} />
        <SideDrawer
          show={open}
          sections={sections}
          hideBar={this._handelHideBar}
        />
        {open ? <Backdrop click={this._backdropClickHandler} /> : null}
      </Fragment>
    ) : (
      <HorizontalNav sections={sections} />
    );

    return <nav>{nav}</nav>;
  }
}

Nav.propTypes = {
  sections: PropTypes.array.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default withSizes((sizes) => ({ isMobile: sizes.width < 630 }))(Nav);
