import React from 'react';
import PropTypes from 'prop-types';
import { Trans } from '@lingui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Section from '../../components/Section';

import N from '../../svgs/N.svg';
import V from '../../svgs/V.svg';

import './index.scss';

function AboutSection(props) {
  const { i18n } = props;
  return (
    <React.Fragment>
      <Section
        className="about"
        icon="user-ninja"
        title={<Trans id="about.title" />}
      >
        <N className="about__nvector" />
        <h2 className="about__subtitle">
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
        <blockquote className="about__quote">
          <Trans
            id="about.text.quote"
            render={({ translation }) => (
              <span className="about__quote__text">{translation}</span>
            )}
          />
          <Trans
            id="about.text.quoteCite"
            render={({ translation }) => (
              <span className="about__quote__cite">{translation}</span>
            )}
          />
        </blockquote>
        <h2 className="about__subtitle">
          <b>
            <Trans id="about.text.hobbytitle" />
          </b>
        </h2>
        <p>
          <Trans id="about.text.hobby" />
        </p>
        <ul className="about__hobbies fa-ul">
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
        <V className="about__vvector" />
      </Section>
    </React.Fragment>
  );
}

AboutSection.Proptypes = {
  classes: PropTypes.object.isRequired,
};

export default AboutSection;
