/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers';

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
      {element}
    </Provider>
  );
};

export const onRenderBody = ({ setHeadComponents, pathname }) => {
  setHeadComponents([
    <link
      key="GOOGLE_FONTS"
      href="https://fonts.googleapis.com/css?family=Anonymous+Pro:400,700|Poppins:400,700"
      rel="stylesheet"
    />,
  ]);
};
