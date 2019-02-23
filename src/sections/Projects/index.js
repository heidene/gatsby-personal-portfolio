import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

function ProjectsSection(props) {
  return (
    <div className="section section_projects">
      <h1>Projects</h1>
    </div>
  );
}

ProjectsSection.Proptypes = {
  classes: PropTypes.object.isRequired,
};

export default ProjectsSection;
