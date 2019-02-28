import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withSizes from 'react-sizes';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Trans } from '@lingui/react';
import { setLang, setScrollLock } from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import anime from 'animejs';
import FabButton from '../FabButton';

import './index.scss';

class SettingsMenu extends React.Component {
  tl = null;

  constructor(props) {
    super(props);
    this.state = {
      language: props.language,
      initialRender: true,
      open: false,
    };
    this.settingBtnRef = React.createRef();
  }

  _setupTimeLine = () => {
    let settingOptions = 3;

    if (this.props.onlyFreescroll) {
      this.props.setScrollLock(false);
      settingOptions -= 1;
    }

    this.tl = anime.timeline({
      targets: '.settings-menu__setting',
      duration: 300,
      easing: 'linear',
      delay: anime.stagger(100),
      autoplay: false,
    });

    const staggerTo = 40 * settingOptions + 8 * (settingOptions + 1);

    this.tl.add({
      translateY: anime.stagger([-56, -staggerTo]),
      opacity: [0, 1],
      easing: 'easeOutQuad',
    });

    this.tl.add({
      targets: '.settings-menu__setting > span',
      duration: 200,
      translateX: ['100%', '0%'],
      opacity: [0, 1],
    });
  };

  componentDidMount = () => {
    const { current: settingBtnDom } = this.settingBtnRef;
    const { left, width, top, height } = settingBtnDom.getBoundingClientRect();

    this._setupTimeLine();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.open !== this.state.open) {
      if (this.state.open) {
        this._openAnimation();
      } else {
        this._closeAnimation();
      }
    }
    if (prevProps.onlyFreescroll !== this.props.onlyFreescroll) {
      this._setupTimeLine();
    }
  };

  _onOpenHandler = () => {
    this.setState((prevState) => {
      return { open: !prevState.open };
    });
  };

  _onClickHandlerScrollMode = () => {
    this.props.setScrollLock(!this.props.scrollLocked);
    this._onOpenHandler();
  };

  _onClickHandlerLang = (param) => (event) => {
    this.props.setLang(param);
    this._onOpenHandler();
  };

  _closeAnimation = () => {
    if (!this.tl.reversed) {
      this.tl.began = this.tl.completed = false;
      this.tl.loop = this.tl.progress = 0;
      this.tl.reverse();
    }
    this.tl.play();
  };

  _openAnimation = () => {
    if (this.tl.reversed) {
      this.tl.began = this.tl.completed = false;
      this.tl.loop = this.tl.progress = 0;
      this.tl.reverse();
    }
    this.tl.play();
  };

  _renderScrollSettingOption = (onlyFreescroll, openClass, scrollState) => {
    if (onlyFreescroll) {
      return null;
    } else {
      return (
        <div
          className={`settings-menu__setting  settings-menu__scroll ${openClass}`}
        >
          <span>Scroll lock</span>
          <FabButton
            mini
            positionfree
            onClick={this._onClickHandlerScrollMode}
            blue
          >
            <div className="icons">
              <FontAwesomeIcon
                className={`icon icon_default ${scrollState}`}
                icon={'lock'}
                size="lg"
              />
              <FontAwesomeIcon
                className={`icon icon_active ${scrollState}`}
                icon={'lock-open'}
                size="lg"
              />
            </div>
          </FabButton>
        </div>
      );
    }
  };

  render() {
    const {
      isHeightMini,
      scrollLocked,
      elevated,
      language,
      onlyFreescroll,
    } = this.props;
    const { open } = this.state;
    const openClass = open ? 'open' : 'closed';
    const scrollState = !scrollLocked ? 'open' : '';
    const heightMiniClass = isHeightMini ? 'heightMini' : '';
    const elevatedClass = elevated ? 'elevated' : '';
    return (
      <div
        className={`settings-menu ${openClass} ${heightMiniClass} ${elevatedClass}`}
      >
        <FabButton
          ref={this.settingBtnRef}
          className="settings-menu__main-btn"
          onClick={this._onOpenHandler}
          positionfree
          mini={isHeightMini}
        >
          <div className="icons">
            <FontAwesomeIcon
              className={`icon icon_default ${openClass}`}
              icon={'cog'}
              size="lg"
            />
            <FontAwesomeIcon
              className={`icon icon_active ${openClass}`}
              icon={'times'}
              size="lg"
            />
          </div>
        </FabButton>
        <div
          className={`settings-menu__setting settings-menu__nl ${openClass}`}
        >
          <span
            className={language === 'nl' ? 'settings-menu__lang-selected' : ''}
          >
            Nederlands
          </span>
          <FabButton
            mini
            positionfree
            yellow
            onClick={this._onClickHandlerLang('nl')}
          >
            <span>
              <b>NL</b>
            </span>
          </FabButton>
        </div>
        <div
          className={`settings-menu__setting  settings-menu__en ${openClass}`}
        >
          <span
            className={language === 'en' ? 'settings-menu__lang-selected' : ''}
          >
            English
          </span>
          <FabButton
            mini
            positionfree
            yellow
            onClick={this._onClickHandlerLang('en')}
          >
            <span>
              <b>EN</b>
            </span>
          </FabButton>
        </div>
        {this._renderScrollSettingOption(
            onlyFreescroll,
            openClass,
            scrollState
        )}
      </div>
    );
  }
}

SettingsMenu.propTypes = {
  scrollLocked: PropTypes.bool.isRequired,
  language: PropTypes.string.isRequired,
  setScrollLock: PropTypes.func.isRequired,
  isHeightMini: PropTypes.bool.isRequired,
  elevated: PropTypes.bool,
};

const mapStateToProps = (state) => {
  const {
    indexState: { index, maxIndex },
    ui: { scrollLocked, verticalHeight },
  } = state;
  const elevated = index === maxIndex ? true : false;
  let onlyFreescroll = false;
  if (verticalHeight <= 700) {
    onlyFreescroll = true;
  } else {
    if ('ontouchstart' in document.documentElement) {
      if (verticalHeight <= 1000) {
        onlyFreescroll = true;
      }
    }
  }
  return {
    scrollLocked: scrollLocked,
    language: state.locales.lang,
    elevated: elevated,
    onlyFreescroll,
  };
};

const enhancer = compose(
    connect(
        mapStateToProps,
        { setLang, setScrollLock }
    ),
    withSizes(({ height }) => ({
      isHeightMini: height <= 568,
    }))
);

const ConnectedSettingsMenu = enhancer(SettingsMenu);

export default ConnectedSettingsMenu;
