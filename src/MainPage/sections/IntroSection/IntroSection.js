import React from 'react';
import PT from 'prop-types';

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

        this.updateParallaxForScrollPosition(top);
    }

    handleRouletteImageLoad() {
        this.setState({ rouletteDesignLoaded: true });
    }

    componentDidMount() {


        //
        // Listen for scroll events on the window
        //
        window.addEventListener('scroll', this.handleWindowScroll);


        this.setState({ componentMounted: true });
    }

    render() {

        const {
            rouletteDesignLoaded,
            greetingTransformY,
            greetingOpacity,
            aboutMeTransformY,
        } = this.state;

        const rouletteTransformY = DEFAULT_ROULETTE_DESIGN_TRANSFORM + this.state.rouletteDesignTransformY;
        const rouletteCaptionTransform = Math.abs(rouletteTransformY / 5);

        const rouletteStyles = {
            transform: `translateY(${rouletteTransformY}px)`
        };

        const rouletteCaptionStyles = {
            //transform: `translateY(${rouletteCaptionTransform}px)`,
            transform: `translate(${DEFAULT_ROULETTE_CAPTION_TRANSFORM_X}px, ${DEFAULT_ROULETTE_CAPTION_TRANSFORM_Y + rouletteCaptionTransform}px)`,
        };

        const greetingStyles = {
            transform: `translateY(${greetingTransformY}px)`,
            opacity: greetingOpacity,
        };

        const aboutMeStyles = {
            transform: `translateY(${aboutMeTransformY}px)`,
        };

        const rouletteDesignClassName = ( rouletteDesignLoaded ? 'visible' : '' );

        return (
            <section id="intro-section" ref={this.sectionHTMLElement}>
                <div className="primary">
                    <h1 id="greeting" style={greetingStyles}
                        >
                        <span className={CSS_ANIMATION.fadeInFromBottom}> Hi, </span> 
                        <span className={CSS_ANIMATION.fadeInFromBottom}> I&apos;m Hans.  </span>
                    </h1> 
                    <p id="about-me" style={aboutMeStyles}>
                        <span className={CSS_ANIMATION.fadeInFromLeft}>
                            I&apos;m a growing 
                        </span> 
                        <span className={CSS_ANIMATION.fadeInFromLeft}>
                            <strong> front-end </strong> and <strong> iOS </strong> developer.
                        </span>
                        <span className={CSS_ANIMATION.fadeInFromLeft}>
                            Scroll down to see examples
                        </span>
                        <span className={CSS_ANIMATION.fadeInFromLeft}>
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
};

export default IntroSection;
