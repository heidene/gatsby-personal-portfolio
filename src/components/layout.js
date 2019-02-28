import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { SizesProvider } from 'react-sizes';
import { connect } from 'react-redux';
import { I18nProvider } from '@lingui/react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLinkedinIn, faGithubAlt } from '@fortawesome/free-brands-svg-icons';
import {
  faLink,
  faDownload,
  faChalkboard,
  faAt,
  faUserNinja,
  faIdCard,
  faEnvelope,
  faCog,
  faTimes,
  faLockOpen,
  faLock,
  faGamepad,
  faDumbbell,
  faPen,
  faTruckMonster,
  faPaperPlane,
  faSpinner,
  faCheck,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';

import 'normalize.css';
import './layout.scss';

library.add(
    faLinkedinIn,
    faGithubAlt,
    faLink,
    faDownload,
    faAt,
    faIdCard,
    faUserNinja,
    faChalkboard,
    faEnvelope,
    faCog,
    faTimes,
    faLockOpen,
    faLock,
    faGamepad,
    faDumbbell,
    faPen,
    faTruckMonster,
    faPaperPlane,
    faSpinner,
    faCheck,
    faExclamationTriangle
);

const Layout = ({ children, lang }) => {
  const catalog = require(`../locale/${lang}/messages.js`);
  const config = { fallbackWidth: 360, fallbackHeight: 640 };

  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={(data) => (
        <I18nProvider language={lang} catalogs={{ [lang]: catalog }}>
          <SizesProvider config={config}>
            <main>{children}</main>
          </SizesProvider>
        </I18nProvider>
      )}
    />
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

const mapStateToProps = (state) => {
  return {
    lang: state.locales.lang,
  };
};

export default connect(mapStateToProps)(Layout);
