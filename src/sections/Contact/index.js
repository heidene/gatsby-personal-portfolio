import React from 'react';
import Footer from '../../components/Footer';
import PropTypes from 'prop-types';
import withSizes from 'react-sizes';
import { compose } from 'recompose';
import { Trans } from '@lingui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Obfuscate from 'react-obfuscate';
import ContactForm from '../../components/ContactForm';
import Section from '../../components/Section';

import Belgium from '../../svgs/Belgium.svg';

import './index.scss';

function ContactSection(props) {
  return (
    <React.Fragment>
      <Section
        icon="id-card"
        title={<Trans id="contact.title" />}
        className="section-contact"
      >
        <Belgium className="section-contact__belgium" />
        <div className="section-contact__info">
          <span style={{ marginRight: 5 }}>
            <Trans id="contact.subtitle" />
          </span>
          <span>
            <Obfuscate email="nico@vandenhove.me" />
          </span>
          <span style={{ marginLeft: 5 }}>
            <Trans id="contact.subtitle2" />
          </span>
        </div>
        <ContactForm />
        <div className="section-contact__soc">
          <div className="section-contact__soc_divider">
            <hr />
            <FontAwesomeIcon icon="link" />
            <hr />
          </div>
          <div className="section-contact__soc-btns">
            <a href="https://www.linkedin.com/in/nicovandenhove">
              <FontAwesomeIcon icon={['fab', 'linkedin-in']} size="2x" />
            </a>
            <a href="https://github.com/heidene">
              <FontAwesomeIcon icon={['fab', 'github-alt']} size="2x" />
            </a>
          </div>
        </div>
      </Section>
      <Trans
        id="footer"
        render={({ translation }) => <Footer footerText={translation} />}
      />
    </React.Fragment>
  );
}

const enhancer = compose(
    withSizes((sizes) => ({
      isMobile: withSizes.isMobile(sizes),
      isTooSmall: sizes.width <= 335,
    }))
);

export default enhancer(ContactSection);
