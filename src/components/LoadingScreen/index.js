import React from 'react';

import './index.scss';

function loadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-screen__content">
        <div className="lds-grid">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
        <span className="loading-screen__text">Loading...</span>
      </div>
    </div>
  );
}

export default loadingScreen;
