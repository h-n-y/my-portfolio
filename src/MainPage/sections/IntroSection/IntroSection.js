import React from 'react';
import PT from 'prop-types';
import * as Section from '../shared';

import rouletteDesign from '../../../assets/img/roulette-design.png';

import {
    CSS_ANIMATION,
} from '../../../constants/constants';

const DEFAULT_ROULETTE_DESIGN_TRANSFORM = -80/*px*/;
const DEFAULT_ROULETTE_CAPTION_TRANSFORM_Y = -60/*px*/;
const DEFAULT_ROULETTE_CAPTION_TRANSFORM_X = 90/*px*/;

class IntroSection extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            rouletteDesignLoaded: false,
            rouletteDesignTransformY: 0,
            greetingTransformY: 0,
            greetingOpacity: 1,
            aboutMeTransformY: 0,
        };

        this.handleWindowScroll = this.handleWindowScroll.bind(this);
        this.handleRouletteImageLoad = this.handleRouletteImageLoad.bind(this);

        this.sectionHTMLElement = React.createRef();
    }

    updateParallaxForScrollPosition(position) {
        //console.log(position);

        //
        // transforms
        //
        // NOTE: The denominator values here affect the "speed" of the parallax effects
        // and are subjectively chosen.
        //
        const rouletteDesignTransformY = Math.floor(position / 2);
        const greetingTransformY = Math.floor(position / 5);
        const aboutMeTransformY = -1 * Math.floor(position / 2);

        //
        // opacities
        //

        // set greeting to fade to 0 opacity over a 300 pixel scroll
        const greetingOpacity = Math.max(0, (1 - ( -position / 300 )));

        this.setState({ 
            rouletteDesignTransformY,
            greetingTransformY,
            aboutMeTransformY,

            greetingOpacity,
        });
    }

    handleWindowScroll(e) {
        const sectionHTMLElement = this.sectionHTMLElement.current;
        const { top } = sectionHTMLElement.getBoundingClientRect();

        const shouldUpdateForScroll = Section.insideScrollRangeForUpdates.call(this, top);
        if ( shouldUpdateForScroll ) {

            this.updateParallaxForScrollPosition(top);
        }

    }

    handleRouletteImageLoad() {
        this.setState({ rouletteDesignLoaded: true });
    }

    componentDidMount() {


        //
        // Listen for scroll events on the window
        //
        window.addEventListener('scroll', this.handleWindowScroll);
    }

    render() {

        const {
            rouletteDesignLoaded,
            greetingTransformY,
            greetingOpacity,
            aboutMeTransformY,
        } = this.state;

        const rouletteDesignClassName = ( rouletteDesignLoaded ? 'visible' : '' );
        let rouletteCaptionStyles = {
                transform: `translate(${DEFAULT_ROULETTE_CAPTION_TRANSFORM_X}px, ${DEFAULT_ROULETTE_CAPTION_TRANSFORM_Y}px)`,
        };

        let 
            rouletteTransformY = 0,
            rouletteCaptionTransform = 0,
            rouletteStyles, 
            greetingStyles, 
            aboutMeStyles,
            greetingSpanClassName,
            aboutMeParagraphClassName;
        //
        // Check if desktop-specific styles need to be added
        //
        if ( Section.shouldDisplayDesktopUI.call(this) ) {

            greetingSpanClassName = CSS_ANIMATION.fadeInFromBottom;
            aboutMeParagraphClassName = CSS_ANIMATION.fadeInFromLeft;

            rouletteTransformY = DEFAULT_ROULETTE_DESIGN_TRANSFORM + this.state.rouletteDesignTransformY;
            rouletteCaptionTransform = Math.abs(rouletteTransformY / 5);

            rouletteStyles = {
                transform: `translateY(${rouletteTransformY}px)`
            };

            rouletteCaptionStyles = {
                transform: `translate(${DEFAULT_ROULETTE_CAPTION_TRANSFORM_X}px, ${DEFAULT_ROULETTE_CAPTION_TRANSFORM_Y + rouletteCaptionTransform}px)`,
            };

            greetingStyles = {
                transform: `translateY(${greetingTransformY}px)`,
                opacity: greetingOpacity,
            };

            aboutMeStyles = {
                transform: `translateY(${aboutMeTransformY}px)`,
            };
        }

        return (
            <section id="intro-section" ref={this.sectionHTMLElement}>
                <div className="primary">
                    <h1 id="greeting" style={greetingStyles}
                        >
                        <span className={greetingSpanClassName}> Hi, </span> 
                        <span className={greetingSpanClassName}> I&apos;m Hans.  </span>
                    </h1> 
                    <p id="about-me" style={aboutMeStyles}>
                        <span className={aboutMeParagraphClassName}>
                            I&apos;m a growing 
                        </span> 
                        <span className={aboutMeParagraphClassName}>
                            <strong> front-end </strong> and <strong> iOS </strong> developer.
                        </span>
                        <span className={aboutMeParagraphClassName}>
                            Scroll down to see examples
                        </span>
                        <span className={aboutMeParagraphClassName}>
                            of my work: 
                        </span>
                    </p>
                </div>
                <figure id="roulette-design-wrapper"
                    style={rouletteStyles}>
                    <img src={rouletteDesign} alt="roulette design" 
                        onLoad={this.handleRouletteImageLoad} 
                        className={rouletteDesignClassName}/> 

                    <figcaption style={rouletteCaptionStyles}>
                        * made with Roulette  
                    </figcaption>
                </figure>
            </section>
        );
    }
}

IntroSection.propTypes = {
    viewportWidth: PT.number.isRequired,
    scrollRangeForUpdates: PT.shape({
        min: PT.number,
        max: PT.number,
    }).isRequired,
};

export default IntroSection;
