import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startNav, setIndex } from '../../actions';
import anime from 'animejs';
import { Trans, withI18n } from '@lingui/react';
import './index.scss';

class HorizontalNav extends Component {
  previousActive = 0;

  constructor(props) {
    super(props);
    this.menuRef = React.createRef();
    this.magicLineRef = React.createRef();
    this.state = {
      active: 0,
    };
  }

  clicked = false;

  _setMenuValues = () => {
    const { left, right, width } = this.menuRef.current.getBoundingClientRect();
    this.menuValues = { left, right, width };
  };

  _setItemValues = () => {
    this.itemValues = Array.from(this.menuRef.current.childNodes)
        .slice(1)
        .map((child) => {
          const { left, right, width } = child.getBoundingClientRect();
          return { left, right, width };
        });
  };

  _setLineStyle = () => {
    const { left, width } = this.menuValues;
    const { left: l, width: w } = this.itemValues[this.state.active];
    this.magicLineRef.current.style.transform = `translateX(${l -
      left}px) scaleX(${w / width})`;
    this.magicLineRef.current.style.transformOrigin = '0% 50% 0';
  };

  componentDidMount() {
    this.hoverIndex = null;
    this._setMenuValues();
    this._setItemValues();
    this._setLineStyle();
  }

  componentDidUpdate(prevProps) {
    // if (this.hoverIndex === null || prevProps.active !== this.props.active) {
    if (prevProps.active !== this.props.active) {
      this.previousActive = prevProps.active;
      this._calculateAnimation(prevProps.active, this.props.active);
    }
    if (this.props.i18nHash !== prevProps.i18nHash) {
      this._setMenuValues();
      this._setItemValues();
      this._calculateAnimation(this.previousActive, this.props.active);
    }
  }

  _calculateAnimation = (prevIndex, newIndex) => {
    if (
      typeof prevIndex === undefined ||
      typeof newIndex === undefined ||
      prevIndex === null ||
      newIndex === null
    ) {
      return;
    }
    const { left, right, width } = this.menuValues;

    const {
      left: prevLeft,
      right: prevRight,
      width: prevWidth,
    } = this.itemValues[prevIndex];

    const {
      left: nextLeft,
      right: nextRight,
      width: nextWidth,
    } = this.itemValues[newIndex];

    const defaultScaleX = prevWidth / width;

    const endScaleX = nextWidth / width;

    let defaultTranslateX;
    let startScaleX;
    let endTranslateX;

    if (newIndex > prevIndex) {
      defaultTranslateX = prevLeft - left;

      startScaleX = (nextRight - prevLeft - nextWidth / 2) / width;

      endTranslateX = nextLeft - left;

      this.magicLineRef.current.style.transformOrigin = '0% 50% 0';
    }

    if (newIndex < prevIndex) {
      defaultTranslateX = prevRight - right;

      startScaleX = (prevRight - nextLeft - nextWidth / 2) / width;

      endTranslateX = nextRight - right;

      this.magicLineRef.current.style.transformOrigin = '100% 50% 0';
    }
    this._animateTimeLine(
        defaultTranslateX,
        defaultScaleX,
        startScaleX,
        endTranslateX,
        endScaleX
    );
  };

  _animateTimeLine = (
      defaultTranslateX,
      defaultScaleX,
      startScaleX,
      endTranslateX,
      endScaleX
  ) => {
    const timeline = anime.timeline({
      targets: this.magicLineRef.current,
      duration: 300,
      easing: 'linear',
    });

    timeline
        .add({
          translateX: [defaultTranslateX, defaultTranslateX],
          scaleX: [defaultScaleX, startScaleX],
        })
        .add({
          translateX: [defaultTranslateX, endTranslateX],
          scaleX: [startScaleX, endScaleX],
        });
  };

  _handleItemClick = (index) => {
    this.props.startNav();
    this.props.setIndex(index);
  };

  _handleItemHover = (index) => {
    // if (this.hoverIndex !== null) {
    //   this._calculateAnimation(this.hoverIndex, index);
    // } else {
    //   if (this.props.active !== index) {
    //     this._calculateAnimation(this.props.active, index);
    //   }
    // }
    // this.hoverIndex = index;
  };

  _handleItemLeave = () => {
    if (this.hoverIndex !== this.props.active) {
      this._calculateAnimation(this.hoverIndex, this.props.active);
    }
    this.hoverIndex = null;
  };

  _renderMenuItems(sections) {
    return sections.map((section, index) => {
      return (
        <li
          key={index}
          className={`h-menu__list-item ${
            index === this.props.active ? 'h-menu__active' : ''
          }`}
        >
          <button
            onClick={() => this._handleItemClick(index)}
            onMouseEnter={() => {
              this._handleItemHover(index);
            }}
          >
            <Trans id={section.title} />
          </button>
        </li>
      );
    });
  }

  _menuRefCallback = (element) => {
    if (element) {
      this.props.getSize(element.getBoundingClientRect());
    }
  };

  render() {
    const { sections } = this.props;
    return (
      <ul
        ref={this.menuRef}
        className="h-menu__list"
        onMouseLeave={this._handleItemLeave}
      >
        <li ref={this.magicLineRef} className="h-menu__magic-line" />
        {this._renderMenuItems(sections)}
      </ul>
    );
  }
}

HorizontalNav.propTypes = {
  sections: PropTypes.array.isRequired,
};

HorizontalNav.defaultProps = {
  active: 0,
};

const mapStateToProps = (state) => ({
  active: state.indexState.index,
  // selectedLanguage: state.locales.lang,
});

const mapDispatchToProps = {
  startNav,
  setIndex,
};

export default withI18n()(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(HorizontalNav)
);
