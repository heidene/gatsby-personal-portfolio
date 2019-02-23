import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

export default class Footer extends React.Component {
  render() {
    const {footerText} = this.props;

    return (
      <footer>
        <span dangerouslySetInnerHTML={{__html: footerText.toUpperCase()}} />
      </footer>
    );
  }
}

Footer.propTypes = {
  footerText: PropTypes.string,
};
