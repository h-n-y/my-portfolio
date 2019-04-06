import React from 'react';
import PT from 'prop-types';
import * as Section from '../shared';

import SectionTitle from '../SectionTitle/SectionTitle';
import AppLink from '../../AppLink/AppLink';

// images
import Jack from '../../../assets/img/jack.png';
import pumpkin from '../../../assets/img/pumpkin.png';
import skull from '../../../assets/img/skull.png';
import candy from '../../../assets/img/candy-corn.png';

import {
    APP_LINK_TYPE,
    CSS_ANIMATION,
    SECTION_TITLE_POSITION,
} from '../../../constants/constants';

import {
    toCSSClassName,
} from '../../../utility/utility';

const APP_KEYWORDS = [
    'JavaScript',
    '<canvas>',
    'Udacity'
];

/*
 * When the distance between the top of the viewport and the top of this section
 * falls under this threshold, the section text is animated into view.
 */
const TEXT_DISPLAY_SCROLL_THRESHOLD = 200/*px*/;
const JACK_DISPLAY_SCROLL_THRESHOLD = TEXT_DISPLAY_SCROLL_THRESHOLD;
const PUMPKIN_SKULL_PEEK_ANIMATION_THRESHOLD = 0/*px*/;

/**
 * Displays a summary of my Trick-or-Treat game app.
 */
class TrickOrTreatSection extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sectionTextVisible: false,
            jackAndCandyVisible: false,
            pumpkinAndSkullsShouldPeek: false,
            sectionTransformY: 0,
            udacityCreditTransformY: 0,
        };

        this.handleWindowScroll = this.handleWindowScroll.bind(this);

        this.sectionHTMLElement = React.createRef();
    }

    /**
     * @param width {number} - The width of the viewport.
     * @returns the correct section title position for the given
     * viewport width.
     */
    sectionTitlePositionForViewportWidth(width) {
        if ( width < 600 ) {
            return SECTION_TITLE_POSITION.center;
        }

        return SECTION_TITLE_POSITION.right;
    }

    /**
     * NOTE: a copy/paste from RouletteSection
     */
    /**
     * @param position {number} - The distance from the top of the section to
     * the top of the viewport.
     * Displays the section text, if necessary.
     */
    conditionallyDisplaySectionTextForScrollPosition(position) {

        if ( this.state.sectionTextVisible ) { return; }
        if ( position < TEXT_DISPLAY_SCROLL_THRESHOLD ) {
            this.setState({ sectionTextVisible: true });
        }
    }

    /**
     * Displays Jack ( and candy corn ) icons, if necessary.
     * @param position {number} - The distance from the top of the section to
     * the top of the viewport.
     */
    conditionallyDisplayJackForScrollPosition(position) {
        if ( this.state.jackAndCandyVisible ) { return; }
        if ( position < JACK_DISPLAY_SCROLL_THRESHOLD ) {
            this.setState({ jackAndCandyVisible: true });
        }
    }

    /**
     * Hides the pumpkin and skulls, if necessary.
     * @param position {number} - The distance from the top of the section to
     * the top of the viewport.
     */
    conditionallyHidePumpkinAndSkullsForScrollPosition(position) {
        if ( this.state.pumpkinAndSkullsShouldPeek ) { return; }
        if ( position < PUMPKIN_SKULL_PEEK_ANIMATION_THRESHOLD ) {
            this.setState({ pumpkinAndSkullsShouldPeek: true });
        }
    }

    /**
     * Updates parallax state properties for the given scroll position.
     * @param position {number} - The distance from the top of the section to
     * the top of the viewport.
     */
    updateParallaxForSectionScrollPosition(position) {

        const sectionTransformY = 0.4 * position;
        const udacityCreditTransformY = Math.max(0, -0.4 * position);

        this.setState({
            sectionTransformY,
            udacityCreditTransformY,
        });
    }

    /**
     * `window` 'scroll' event listener.
     * Applies various section effectsbased on the current scroll position.
     */
    handleWindowScroll() {

        const sectionHTMLElement = this.sectionHTMLElement.current;
        const { top } = sectionHTMLElement.getBoundingClientRect();

        const shouldUpdateForScroll = Section.insideScrollRangeForUpdates.call(this, top);
        if ( shouldUpdateForScroll ) {
            this.updateParallaxForSectionScrollPosition(top);
            this.conditionallyDisplaySectionTextForScrollPosition(top);
            this.conditionallyDisplayJackForScrollPosition(top);
            this.conditionallyHidePumpkinAndSkullsForScrollPosition(top);
        }
    }

    componentDidMount() {
        Section.setSectionHeight.call(this);

        //
        // Listen for scroll events on the window
        //
        window.addEventListener('scroll', this.handleWindowScroll);
    }

    render() {

        const {
            sectionTextVisible,
            sectionTransformY,
            udacityCreditTransformY,
            jackAndCandyVisible,
            pumpkinAndSkullsShouldPeek,
        } = this.state;
        const { viewportWidth } = this.props;
        const sectionTitlePosition = this.sectionTitlePositionForViewportWidth(viewportWidth);


        let
            sectionStyles,
            udacityCreditStyles,
            jackAndCandyCSSClassName,
            pumpkinCSSClassName = 'tot-pumpkin',
            skullCSSClassName = 'tot-skull',
            appDescriptionCSSClassName = 'app-description';

        //
        // Check if desktop-specific styles need to be added
        //
        if ( Section.shouldDisplayDesktopUI.call(this) ) {

            sectionStyles = {
                transform: `translateY(${sectionTransformY}px)`,
            };

            udacityCreditStyles = {
                transform: `translateY(${udacityCreditTransformY}px)`,
                opacity: ( sectionTextVisible ? 1 : 0 ),
            };

            appDescriptionCSSClassName = toCSSClassName([
                'app-description',
                ( sectionTextVisible ? CSS_ANIMATION.fadeInFromRight : '' ),
            ]);

            jackAndCandyCSSClassName = ( jackAndCandyVisible ? CSS_ANIMATION.fadeIn : '' );

            pumpkinCSSClassName = toCSSClassName([
                'tot-pumpkin',
                ( pumpkinAndSkullsShouldPeek ? CSS_ANIMATION.hidePumpkin : '' )
            ]);

            skullCSSClassName = toCSSClassName([
                'tot-skull',
                ( pumpkinAndSkullsShouldPeek ? CSS_ANIMATION.hideSkull : '' )
            ]);
        }

        return (
            <div id="trick-or-treat-section-wrapper"
                ref={this.sectionHTMLElement}>
                <div id="grey-panel-desktop-bg"></div>
                    
                <div id="trick-or-treat-section"
                    style={sectionStyles}>
                    <div id="jack-and-candy"
                        className={jackAndCandyCSSClassName}
                        >
                        <img src={Jack} alt="Jack" className="tot-jack"/> 
                        <div className="app-link-wrapper">
                            <AppLink
                                title="Help"
                                linkType={APP_LINK_TYPE.standard} />
                        </div>
                        <img src={candy} alt="candy corn" className="tot-candy"/>
                    </div>

                    <div className="primary">
                        <SectionTitle
                            isVisible={sectionTextVisible}
                            title="Trick-or-Treat"
                            keywords={APP_KEYWORDS}
                            position={sectionTitlePosition}
                            displayedOverDarkBackground={true}
                            viewportWidth={this.props.viewportWidth}
                        />
                         

                        <img src={Jack} alt="Jack" className="tot-jack mobile-only"/> 

                        <p className={appDescriptionCSSClassName}>
                            Help Jack find the candy corn he lost while trick-or-treating! 
                        </p>
                        <p className="udacity-credit"
                            style={udacityCreditStyles}>
                            Built atop a game engine provided by 
                            <a href="javascript:;">
                                Udacity 
                            </a>,
                           from whom I took and completed a 
                            <a href="javascript:;"
                                className="udacity-fed-link">
                                Front-end Developer 
                            </a> 
                            course.
                        </p>

                        {/* mobile candy corn image */}
                        <img src={candy} alt="candy corn" className="tot-candy mobile-only"/>

                        <div className="app-link-wrapper mobile-only">
                            <AppLink
                                title="Help"
                                linkType={APP_LINK_TYPE.standard} />
                        </div>
                    </div>

                    {/* skulls and pumpkins */}
                    <div id="skulls-and-pumpkins">
                        <img src={skull} alt="skull" className={skullCSSClassName}/> 
                        <img src={pumpkin} alt="pumpkin" className={pumpkinCSSClassName}/> 
                        <img src={skull} alt="skull" className={skullCSSClassName}/> 
                    </div>
                     
                </div>
            </div>

        );
    }
}

TrickOrTreatSection.propTypes = {

    //
    // Required in order to set the text alignment of the SectionTitle
    // Normally would just use CSS, but this SectionTitle styling differs
    // from other SectionTitles in its text-alignment behavior.
    //
    viewportWidth: PT.number.isRequired,

    desktopScrollPosition: PT.number.isRequired,
};

export default TrickOrTreatSection;
