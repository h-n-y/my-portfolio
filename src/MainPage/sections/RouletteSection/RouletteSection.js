import React from 'react';
import PT from 'prop-types';
import * as Section from '../shared';

import SectionTitle from '../SectionTitle/SectionTitle';
import AppLink from '../../AppLink/AppLink';

import rouletteDesignDesaturated from '../../../assets/img/roulette-design-desaturated.png';
import rouletteDesign1 from '../../../assets/img/roulette-example-1.png';
import rouletteDesign2 from '../../../assets/img/roulette-example-2.png';
import rouletteDesign3 from '../../../assets/img/roulette-example-3.png';

import {
    APP_LINK_TYPE,
    CSS_ANIMATION,
} from '../../../constants/constants';

import {
    toCSSClassName,
} from '../../../utility/utility';

const APP_KEYWORDS = [
    'React',
    '<canvas>',
    'art'
];

/**
 * Link to Roulette app
 */
const ROULETTE_HREF = 'https://h-n-y.github.io/roulette';

/*
 * When the distance between the top of the viewport and the top of this section
 * falls under this threshold, the section text is animated into view.
 */
const TEXT_DISPLAY_SCROLL_THRESHOLD = 350/*px*/;

/**
 * Displays a summary of my Roulette app.
 */
class RouletteSection extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sectionTextVisible: false,
            rouletteCardsVisible: false, // set to true as soon as scrolling starts
            rouletteImageLoadedFlags: [ false, false, false, false ],

            rouletteCard1TransformY: 0,
            rouletteCard2TransformY: 0,
            appLinkTransformY: 0,

            rouletteImage1TransformY: 0,
            rouletteImage2TransformY: 0,
        };

        this.handleImageLoad = this.handleImageLoad.bind(this);
        this.handleWindowScroll = this.handleWindowScroll.bind(this);

        this.sectionHTMLElement = React.createRef();
    }

    /**
     * Updates the state such that the loaded image fades into view.
     * @param rouletteImageIndex {number} - The index of the load flag for the
     * loaded image.
     */
    handleImageLoad(rouletteImageIndex) {

        console.log(`roulette ${rouletteImageIndex} loaded`);
        const flags = this.state.rouletteImageLoadedFlags;
        const flagsUpdated = flags.slice(0, flags.length);
        flagsUpdated[rouletteImageIndex] = true;

        this.setState({ rouletteImageLoadedFlags: flagsUpdated });
    }

    /**
     * `window` 'scroll' event listener.
     * Updates parallax and text effects, if necessary.
     */
    handleWindowScroll() {

        const sectionHTMLElement = this.sectionHTMLElement.current;
        const { top } = sectionHTMLElement.getBoundingClientRect();

        const shouldUpdateForScroll = Section.insideScrollRangeForUpdates.call(this, top);
        if ( shouldUpdateForScroll ) {
            this.updateParallaxForSectionScrollPosition(top);
            this.conditionallyDisplaySectionTextForScrollPosition(top);
        }

        /**
         * Show the roulette cards as soon as the section reaches the top
         * of the viewport
         */
        /*
        console.log(`top: ${top}px\tcards: ${this.state.rouletteCardsVisible}`);
        if ( top < 0 && !this.state.rouletteCardsVisible ) {
            this.setState({ rouletteCardsVisible: true });
        }
        */
    }

    /**
     * Updates parallax state properties for the current scroll position.
     * @param position {number} - The distance from the top of the section to
     * the top of the viewport.
     */
    updateParallaxForSectionScrollPosition(position) {

        const rouletteCard1TransformY = 0.4 * position - 0;
        const rouletteCard2TransformY = 0.6 * position - 100;

        //const rouletteImage3TransformY = -1 * ( rouletteCard1TransformY / 4 );
        const rouletteImage3TransformY = -0.05 * position;

        const appLinkTransformY = -1 * ( 0.1 * position - 50 );

        this.setState({
            rouletteCard1TransformY,
            rouletteCard2TransformY,
            //rouletteImage1TransformY,
            rouletteImage3TransformY,
            appLinkTransformY,
        });
    }

    /**
     * Sets the visibility state of the section text, if necessary.
     * @param position {number} - The distance from the top of the section t
     * the top of the viewport.
     */
    conditionallyDisplaySectionTextForScrollPosition(position) {
        if ( this.state.sectionTextVisible ) { return; }
        if ( position < TEXT_DISPLAY_SCROLL_THRESHOLD ) {
            this.setState({ sectionTextVisible: true });
        }
    }

    setInitialRouletteCardPositions() {
        const sectionHTMLElement = this.sectionHTMLElement.current;
        const { top } = sectionHTMLElement.getBoundingClientRect();
        this.updateParallaxForSectionScrollPosition(top);
    }

    componentDidMount() {

        Section.setSectionHeight.call(this);
        this.setInitialRouletteCardPositions();

        //
        // Listen for scroll events on the window.
        //
        window.addEventListener('scroll', this.handleWindowScroll);
    }

    render() {

        const [ 
            bgDesignVisible,
            roulette1Visible, 
            roulette2Visible, 

        ] = this.state.rouletteImageLoadedFlags;

        const {
            sectionTextVisible,
            rouletteCardsVisible,
            rouletteCard1TransformY, 
            rouletteCard2TransformY, 
            rouletteImage3TransformY,
            appLinkTransformY,
        } = this.state;

        let 
            rouletteCardCSSClass,
            rouletteCard1Styles,
            rouletteCard2Styles,
            rouletteImage3Styles,
            appLinkWrapperStyles,
            appDescriptionCSSClassName = 'app-description';

        //
        // Check if desktop-specific styles need to be added
        //
        if ( Section.shouldDisplayDesktopUI.call(this) ) {

            rouletteCardCSSClass = toCSSClassName([
                'roulette-card',
                ( rouletteCardsVisible ? 'visible' : '' ), 
            ]);
            
            rouletteCard1Styles = {
                transform: `translateY(${rouletteCard1TransformY}px)`,
            };

            rouletteCard2Styles = {
                transform: `translateY(${rouletteCard2TransformY}px)`,
            };

            rouletteImage3Styles = {
                transform: `translateY(${rouletteImage3TransformY}px)`,
            };

            appLinkWrapperStyles = {
                transform: `translateY(${appLinkTransformY}px)`,
            };

            appDescriptionCSSClassName = toCSSClassName([
                'app-description',
                ( sectionTextVisible ? CSS_ANIMATION.fadeInFromLeft : '' ),
            ]);
        }

        return (

            <div id="roulette-section" ref={this.sectionHTMLElement}>

                <div id="roulette-bg-design-wrapper">
                    <img src={rouletteDesignDesaturated} alt="roulette design"
                        onLoad={() => this.handleImageLoad(0)} 
                        className={bgDesignVisible ? 'visible' : ''}/> 
                </div>
                 
                <div className="primary">
                    <SectionTitle
                        title="Roulette"
                        keywords={APP_KEYWORDS}
                        isVisible={sectionTextVisible}
                        viewportWidth={this.props.viewportWidth}
                    >
                    </SectionTitle>

                    <p className={appDescriptionCSSClassName}>
                            Create and download magnificent designs with this roulette drawing tool for desktop. 
                    </p>

                    <div className="app-link-wrapper" style={appLinkWrapperStyles}>
                        <AppLink
                            title="create"
                            href={ROULETTE_HREF}
                            linkType={APP_LINK_TYPE.clear} />
                    </div>
                </div>

                <div className="roulette-cards">
                     
                    <div className={rouletteCardCSSClass}style={rouletteCard1Styles}>
                        <img src={rouletteDesign1} alt="roulette example"
                            onLoad={() => this.handleImageLoad(1)} 
                            className={roulette1Visible ? 'visible' : ''} 
                        /> 
                    </div>
                    <div className={rouletteCardCSSClass}style={rouletteCard2Styles}>
                        <img src={rouletteDesign2} alt="roulette example"
                            onLoad={() => this.handleImageLoad(2)}
                            className={roulette2Visible ? 'visible' : ''} 
                        />
                    </div>

                    <div className={rouletteCardCSSClass}>
                        <img src={rouletteDesign3} alt="roulette example"
                            style={rouletteImage3Styles}
                            onLoad={() => this.handleImageLoad(3)}
                            className={roulette2Visible ? 'visible' : ''} 
                        />
                    </div>
                </div>
            </div>
        );
    }
}

RouletteSection.propTypes = {
    viewportWidth: PT.number.isRequired,
    viewportHeight: PT.number.isRequired,
    desktopScrollPosition: PT.number.isRequired,
};

export default RouletteSection;
