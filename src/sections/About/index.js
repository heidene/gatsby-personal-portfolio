import React from 'react';
import PropTypes from 'prop-types';
import withSizes from 'react-sizes';
import { compose } from 'recompose';
import { Trans } from '@lingui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import background from '../assets/Background_About.svg';

import './index.scss';

function AboutSection(props) {
  const { isMobile } = props;

  return (
    <div className="section section_about">
      <div className="section__title">
        <div>
          <FontAwesomeIcon icon="user" size={isMobile ? '2x' : '3x'} />
          <h1>
            <Trans id="about.title" />
          </h1>
        </div>
        <hr />
      </div>
      <div className="section__content">
        <h2>
          <b>
            <Trans id="about.text.subtitle" />
          </b>
        </h2>
        <p>
          <Trans id="about.text.me" />
        </p>
        <p>
          <Trans id="about.text.me.1" />
        </p>
        <p>
          <Trans id="about.text.me.2" />
        </p>
        <p>
          <Trans id="about.text.me.3" />
        </p>
        <blockquote>
          <Trans id="about.text.quote" />
        </blockquote>
        <h2>
          <b>
            <Trans id="about.text.hobbytitle" />
          </b>
        </h2>
        <p>
          <Trans id="about.text.hobby" />
        </p>
        <ul className="fa-ul">
          <li>
            <FontAwesomeIcon icon="dumbbell" listItem />
            <Trans id="about.text.hobby.1" />
          </li>
          <li>
            <FontAwesomeIcon icon="truck-monster" listItem />
            <Trans id="about.text.hobby.2" />
          </li>
          <li>
            <FontAwesomeIcon icon="gamepad" listItem />
            <Trans id="about.text.hobby.3" />
          </li>
          <li>
            <FontAwesomeIcon icon="pen" listItem />
            <Trans id="about.text.hobby.4" />
          </li>
        </ul>
      </div>
    </div>
  );
}

AboutSection.Proptypes = {
  classes: PropTypes.object.isRequired,
};

const enhancer = compose(
    withSizes((sizes) => ({ isMobile: withSizes.isMobile(sizes) }))
);

export default enhancer(AboutSection);
