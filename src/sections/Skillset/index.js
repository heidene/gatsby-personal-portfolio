import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withSizes from 'react-sizes';
import { compose } from 'recompose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Trans } from '@lingui/react';
import { connect } from 'react-redux';
import VisibilitySensor from 'react-visibility-sensor';
import Button from '../../components/Button';
import SkillBar from '../../components/SkillBar';

// import background from '../assets/Background_Skillset.svg';
import cvPdf from '../../assets/CV_Nico_Vandenhove.pdf';

import './index.scss';

class SkillsetSection extends Component {
  state = {
    visible: false,
  };

  _renderSkills = (skillset) => {
    const { visible } = this.state;
    const renderedSkills = skillset.map((skill, index) => (
      <div key={index} className="skillset_skill">
        <SkillBar fill={visible ? skill.score : 0} content={skill.name} />
      </div>
    ));
    return renderedSkills;
  };

  _handleVisibilityChange = (isVisible) => {
    this.setState({ visible: isVisible });
  };

  render() {
    const { visible } = this.state;
    const { isMobile, isMiniHeight, currentIndex } = this.props;

    const skillset = [
      { name: 'Javascript', score: 90 },
      { name: 'ReactJS', score: 80 },
      { name: 'React Native', score: 70 },
      { name: 'Cordova', score: 90 },
      { name: 'NodeJS', score: 90 },
      { name: 'NPM', score: 90 },
      { name: 'HTML5', score: 80 },
      { name: 'CSS', score: 80 },
      { name: 'Inkscape', score: 50 },
      { name: 'Gimp', score: 50 },
      { name: 'Java', score: 90 },
      { name: 'Amdocs CRM', score: 80 },
    ];

    const typographySize = isMiniHeight ? 'body1' : 'subheading';

    return (
      <div className="section section_skillset">
        <div className="section__title">
          <div>
            <FontAwesomeIcon icon="chalkboard" size={isMobile ? '2x' : '3x'} />
            <h1>
              <Trans id="skillset.title" />
            </h1>
          </div>
          <hr />
        </div>
        <div className="section__content">
          <p>
            <Trans id="skillset.text" />
          </p>
          <p>
            <Trans id="skillset.text.1" />
          </p>
          <p>
            <Trans id="skillset.text.2" />
          </p>
          <p>
            <Trans id="skillset.text.3" />
          </p>
          <p>
            <Trans id="skillset.text.4" />
          </p>
          <VisibilitySensor
            active={!visible}
            onChange={this._handleVisibilityChange}
            delayedCall
            scrollCheck
          >
            <div className="skillset__skill_list">
              {this._renderSkills(skillset, currentIndex)}
            </div>
          </VisibilitySensor>
          <div className="skillset__buttons">
            <Button href={cvPdf}>
              <FontAwesomeIcon icon="download" className="btn-icon" />
              <Trans id="skillset.cvPDFBtn" />
            </Button>
            <Button href="http://cv.nico.vandenhove.me">
              <FontAwesomeIcon icon="link" className="btn-icon" />
              <Trans id="skillset.cvWebBtn" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentIndex: state.indexState.index,
});

const enhancer = compose(
    withSizes((sizes) => ({
      isMobile: withSizes.isMobile(sizes),
      isMiniHeight: sizes.height <= 480,
    })),
    connect(mapStateToProps)
);

export default enhancer(SkillsetSection);
