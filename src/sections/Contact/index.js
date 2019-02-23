import React from 'react';
import Footer from '../../components/Footer';
import PropTypes from 'prop-types';
import withSizes from 'react-sizes';
import { compose } from 'recompose';
import { Trans } from '@lingui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Obfuscate from 'react-obfuscate';
import ContactForm from '../../components/ContactForm';

// import background from '../assets/Background_Contact.svg';

import './index.scss';

function ContactSection(props) {
  const { isMobile, isTooSmall } = props;

  return (
    <div className="section section_contact">
      <div className="section__title">
        <div>
          <FontAwesomeIcon icon="id-card" size={isMobile ? '2x' : '3x'} />
          <h1>
            <Trans id="contact.title" />
          </h1>
        </div>
        <hr />
      </div>
      <div className="section__content section_contact__content">
        <div className="section_contact__info">
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
        <div className="section_contact__soc">
          {/* <h2>
            <Trans id="contact.social_media" />
          </h2> */}
          <div className="section_contact__soc_divider">
            <hr />
            <FontAwesomeIcon icon="link" />
            <hr />
          </div>
          <div className="section_contact__soc-btns">
            <a href="https://www.linkedin.com/in/nicovandenhove">
              <FontAwesomeIcon icon={['fab', 'linkedin-in']} size="2x" />
            </a>
            <a href="https://github.com/heidene">
              <FontAwesomeIcon icon={['fab', 'github-alt']} size="2x" />
            </a>
          </div>
        </div>
      </div>
      <Trans
        id="footer"
        render={({ translation }) => <Footer footerText={translation} />}
      />
    </div>
  );
}

const enhancer = compose(
    withSizes((sizes) => ({
      isMobile: withSizes.isMobile(sizes),
      isTooSmall: sizes.width <= 335,
    }))
);

export default enhancer(ContactSection);
