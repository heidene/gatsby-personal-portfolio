import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Trans } from '@lingui/react';
import { connect } from 'react-redux';
import { setIndex, startNav } from '../../actions';

import './index.scss';

class SideDrawer extends Component {
  _handleItemClick = (index) => {
    this.props.startNav();
    this.props.setIndex(index);
    this.props.hideBar();
  };

  _handleItemHover = (index) => {};

  _handleItemHoverLeave = (index) => {};

  _renderMenuItems(sections) {
    return sections.map((section, index) => {
      const classes = ['side-drawer__item'];
      if (this.props.activeIndex === index) {
        classes.push('active');
      }
      return (
        <button
          key={index}
          className={classes.join(' ')}
          onClick={() => this._handleItemClick(index)}
          onMouseEnter={() => {
            this._handleItemHover(index);
          }}
        >
          <Trans id={section.title} />
        </button>
      );
    });
  }

  render() {
    const { show, sections } = this.props;
    let classes = 'side-drawer';
    classes += show ? ' open' : '';
    return <aside className={classes}>{this._renderMenuItems(sections)}</aside>;
  }
}

SideDrawer.propTypes = {
  show: PropTypes.bool,
  sections: PropTypes.array.isRequired,
};

SideDrawer.defaultProps = {
  show: false,
};

const mapStateToProps = (state) => ({
  activeIndex: state.indexState.index,
});

export default connect(
    mapStateToProps,
    { setIndex, startNav }
)(SideDrawer);
