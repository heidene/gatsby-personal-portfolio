import React from 'react';
import { i18nMark } from '@lingui/react';

import Layout from '../components/layout';
import * as Sections from '../sections';
import SEO from '../components/seo';
import VerticalScroller from '../components/VerticalScroller';
import Header from '../components/Header';
import SettingsMenu from '../components/SettingsMenu';
import { connect } from 'react-redux';
import { doneLoading } from '../actions';
import LoadingScreen from '../components/LoadingScreen';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    const sections = [];
    sections.push({
      title: i18nMark('home.title'),
      content: <Sections.Home />,
    });
    sections.push({
      title: i18nMark('about.title'),
      content: <Sections.About />,
    });
    sections.push({
      title: i18nMark('skillset.title'),
      content: <Sections.Skillset />,
    });
    // sections.push({ title: i18nMark("projects.title"), content: <Sections.projects /> });
    sections.push({
      title: i18nMark('contact.title'),
      content: <Sections.Contact />,
    });

    this.state = {
      sections: sections,
    };
  }

  componentDidMount() {
    this.props.doneLoading();
  }

  _loading = () => {
    if (!this.props.loaded) {
      return <LoadingScreen />;
    }
  };

  render() {
    return (
      <Layout>
        <SEO title="Portfolio" keywords={[`gatsby`, `application`, `react`]} />
        <Header sections={this.state.sections} />
        {this._loading()}
        <VerticalScroller>
          {this.state.sections.map(({ content }, index) => {
            return <React.Fragment key={index}>{content}</React.Fragment>;
          })}
        </VerticalScroller>
        <SettingsMenu />
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loaded: state.ui.loaded,
  };
};

export default connect(
    mapStateToProps,
    { doneLoading }
)(IndexPage);
