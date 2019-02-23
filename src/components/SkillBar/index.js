import React from 'react';

import './index.scss';

const SkillBar = ({ fill, content }) => {
  return (
    <div className="skill-bar">
      <div className="skill-bar__filler" style={{ width: `${fill}%` }} />
      <span>{content}</span>
    </div>
  );
};

export default SkillBar;
