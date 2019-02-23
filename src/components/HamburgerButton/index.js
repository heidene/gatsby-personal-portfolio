import React, {Component} from 'react';

import './index.scss';

export default class HamburgerButton extends Component {
  render() {
    let className = 'hamburger-btn';
    className += this.props.open ? ' open' : '';
    return (
      <button className={className} onClick={this.props.click}>
        <span className="hamburger-btn__line" />
        <span className="hamburger-btn__line" />
        <span className="hamburger-btn__line" />
      </button>
    );
  }
}
