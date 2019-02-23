/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const logger = (store) => (next) => (action) => {
  console.log('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  return result;
};

// eslint-disable-next-line react/prop-types
export const wrapRootElement = ({ element }) => {
  return (
    <Provider store={createStore(reducers, applyMiddleware(logger))}>
      <GoogleReCaptchaProvider reCaptchaKey="6LfPQJMUAAAAABns7U9cfykywrRxnLPeC3PLFG33">
        {element}
      </GoogleReCaptchaProvider>
    </Provider>
  );
};
