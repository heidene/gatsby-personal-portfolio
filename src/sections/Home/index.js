import { Trans } from '@lingui/react';
import { graphql, StaticQuery } from 'gatsby';
import { connect } from 'react-redux';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React from 'react';
import withSizes from 'react-sizes';
import { compose } from 'recompose';
import Particles from 'react-particles-js';
import './index.scss';

function HomeSection(props) {
  const { isMobile, loaded } = props;

  return (
    <StaticQuery
      query={graphql`
        query {
          mugshot: file(relativePath: { eq: "ProfilePic_Big_Duo.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 1000) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
          json {
            particles {
              number {
                value
                density {
                  enable
                  value_area
                }
              }
              color {
                value
              }
              shape {
                type
                stroke {
                  width
                  color
                }
                polygon {
                  nb_sides
                }
                image {
                  src
                  width
                  height
                }
              }
              opacity {
                value
                random
                anim {
                  enable
                  speed
                  opacity_min
                  sync
                }
              }
              size {
                value
                random
                anim {
                  enable
                  speed
                  size_min
                  sync
                }
              }
              line_linked {
                enable
                distance
                color
                opacity
                width
              }
              move {
                enable
                speed
                direction
                random
                straight
                out_mode
                bounce
                attract {
                  enable
                  rotateX
                  rotateY
                }
              }
            }
            interactivity {
              detect_on
              events {
                onhover {
                  enable
                  mode
                }
                onclick {
                  enable
                  mode
                }
                resize
              }
              modes {
                grab {
                  distance
                  line_linked {
                    opacity
                  }
                }
                bubble {
                  distance
                  size
                  duration
                  opacity
                  speed
                }
                repulse {
                  distance
                  duration
                }
                push {
                  particles_nb
                }
                remove {
                  particles_nb
                }
              }
            }
            retina_detect
          }
        }
      `}
      render={(data) => {
        return (
          <div id="section_home" className="section_home">
            <Particles params={data.json} />
            <div className="home__avatar">
              <Img
                className="avatar__img"
                fluid={data.mugshot.childImageSharp.fluid}
              />
            </div>
            <div className="home__text">
              <div className="home__name">
                <span
                  className={`home__initial ${
                    loaded ? 'home__anim__fadeIn' : ''
                  }`}
                >
                  <b>NICO</b>
                </span>
                <span> </span>
                <span
                  className={`home__initial ${
                    loaded ? 'home__anim__fadeIn home__anime__surname' : ''
                  }`}
                >
                  <b>VANDENHOVE</b>
                </span>
              </div>
              <div className="home__slogan">
                <span
                  className={`home__initial ${
                    loaded ? 'home__anim__fadeIn home__anime__slogan' : ''
                  }`}
                >
                  <Trans id="home.sub_title_section1" />
                </span>
                <span> </span>
                <span
                  className={`home__initial home__slogan__emphasis ${
                    loaded ? 'home__anim__flipInX' : ''
                  }`}
                >
                  <b>
                    <Trans id="home.sub_title_emphasis" />
                  </b>
                </span>
                <span> </span>
                <span
                  className={`home__initial ${
                    loaded ? 'home__anim__fadeIn home__anime__slogan' : ''
                  }`}
                >
                  <Trans id="home.sub_title_section2" />
                </span>
              </div>
            </div>
            <div className="mountains" />
          </div>
        );
      }}
    />
  );
}

HomeSection.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loaded: state.ui.loaded,
});

const enhancer = compose(
    connect(mapStateToProps),
    withSizes((sizes) => ({ isMobile: withSizes.isMobile(sizes) }))
);

export default enhancer(HomeSection);
