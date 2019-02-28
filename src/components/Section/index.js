import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './index.scss';

const section = (props) => {
  const { children, title, icon, className } = props;
  return (
    <section className={`section ${className}`}>
      <div className="section__header">
        <FontAwesomeIcon icon={icon} size="2x" />
        <h1>{title}</h1>
      </div>
      <div className="section__content">{children}</div>
    </section>
  );
};

section.propTypes = {
  children: PropTypes.node,
  title: PropTypes.node,
  icon: PropTypes.string,
};

export default section;
