import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../Nav';

import './index.scss';

class Header extends React.Component {
  initialRender = true;

  componentDidMount(props) {
    this.initialRender = false;
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.index === nextProps.index) {
      return false;
    } else {
      return true;
    }
  }

  renderLogo(index) {
    let className = 'headerTitle';
    if (!this.initialRender) {
      if (index > 0) {
        className += ' fadeIn';
      } else {
        className += ' fadeOut';
      }
    }
    return <span className={className}>Nico Vandenhove</span>;
  }

  render() {
    const { index, sections } = this.props;

    return (
      <header>
        {this.renderLogo(index)}
        <Navbar sections={sections} />
      </header>
    );
  }
}

Header.propTypes = {
  index: PropTypes.number,
  sections: PropTypes.array.isRequired,
};

const mapStateToProps = ({ indexState: { index } }) => {
  return { index };
};

export default connect(mapStateToProps)(Header);
