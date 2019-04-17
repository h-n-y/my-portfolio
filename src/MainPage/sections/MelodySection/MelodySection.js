import React from 'react';
import PT from 'prop-types';
import * as Section from '../shared';

import SectionTitle from '../SectionTitle/SectionTitle';
import AppLink from '../../AppLink/AppLink';

// images
import trebleClef from '../../../assets/svg/treble.svg';
import baseClef from '../../../assets/svg/base.svg';
import sheetMusic from '../../../assets/svg/sheet-music.svg';

import {
    APP_LINK_TYPE,
    CSS_ANIMATION,
    SECTION_TITLE_POSITION,
} from '../../../constants/constants';

import {
    toCSSClassName,
} from '../../../utility/utility';

const APP_KEYWORDS = [
    'Angular 2+',
    '3rd-party API',
    'music'
];

/**
 * Link to Melody app.
 */
const MELODY_APP_HREF = 'https://h-n-y.github.io/melody';

/*
 * When the distance between the top of the viewport and the top of this section
 * falls under this threshold, the section text is animated into view.
 */
const TEXT_DISPLAY_SCROLL_THRESHOLD = 500/*px*/;

/**
 * Displays a summary of my Melody project.
 */
class MelodySection extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sectionTextVisible: false,
            sectionTransformY: 0,
            sheetMusicCardTransformY: 0,
            appLinkTransformY: 0,
        };

        this.handleWindowScroll = this.handleWindowScroll.bind(this);

        this.sectionHTMLElement = React.createRef();
    }

    sectionTitlePositionForViewportWidth(width) {
        if ( width < 600 ) {
            return SECTION_TITLE_POSITION.right;
        }

        return SECTION_TITLE_POSITION.center;
    }

    /**
     * NOTE: this method is the same across several components?
     */
    /**
     * Displays the section text, if necessary.
     * @param position {number} - The distance of the top of the section from the
     * top of the viewport.
     */
    conditionallyDisplaySectionTextForScrollPosition(position) {
        if ( this.state.sectionTextVisible ) { return; }
        if ( position < TEXT_DISPLAY_SCROLL_THRESHOLD ) {
            this.setState({ sectionTextVisible: true });
        }
    }

    /**
     * Updates parallax state properties for the given scroll position.
     * @param position {number} - The distance of the top of the section from
     * the fop of the viewport.
     */
    updateParallaxForSectionScrollPosition(position) {

        const sectionTransformY = 0.6 * position - 400;
        const sheetMusicCardTransformY = 0.4 * position - 400;
        const appLinkTransformY = Math.max(0, -0.4 * position + 100);

        this.setState({
            sectionTransformY,
            sheetMusicCardTransformY,
            appLinkTransformY, 
        });
    }

    /**
     * `window` 'scroll' event listener.
     * Updates parallax and text state, if necessary.
     */
    handleWindowScroll() {

        const sectionHTMLElement = this.sectionHTMLElement.current;
        const { top } = sectionHTMLElement.getBoundingClientRect();

        
        const scrollPadding = 300/*px*/
        const shouldUpdateForScroll = Section.insideScrollRangeForUpdates.call(this, top, scrollPadding);
        if ( shouldUpdateForScroll ) {
            this.updateParallaxForSectionScrollPosition(top);
            this.conditionallyDisplaySectionTextForScrollPosition(top);
        }
    }

    setInitialParallaxPositions() {
        const sectionHTMLElement = this.sectionHTMLElement.current;
        const { top } = sectionHTMLElement.getBoundingClientRect();
        this.updateParallaxForSectionScrollPosition(top);
    }

    componentDidMount() {
        Section.setSectionHeight.call(this);

        this.setInitialParallaxPositions();

        //
        // Listen for scroll events on the window
        //
        window.addEventListener('scroll', this.handleWindowScroll);
    }

    render() {

        const { 
            sectionTextVisible,
            sectionTransformY,
            sheetMusicCardTransformY,
            appLinkTransformY,
        } = this.state;
        const { viewportWidth } = this.props;
        const sectionTitlePosition = this.sectionTitlePositionForViewportWidth(viewportWidth);


        let
            sectionStyles,
            sheetMusicCardStyles,
            appLinkStyles,
            appDescriptionCSSClassName = 'app-description';

        //
        // Check if desktop-specific styles need to be added
        //
        if ( Section.shouldDisplayDesktopUI.call(this) ) {

            sectionStyles = {
                transform: `translateY(${sectionTransformY}px)`,
            };

            sheetMusicCardStyles = {
                transform: `translateY(${sheetMusicCardTransformY}px)`,
            };

            appLinkStyles = {
                transform: `translateY(${appLinkTransformY}px)`,
            };

            appDescriptionCSSClassName = toCSSClassName([
                'app-description',
                ( sectionTextVisible ? CSS_ANIMATION.fadeInFromBottom : '' ),
            ]);
        }

        return (
            <div id="melody-section-wrapper" ref={this.sectionHTMLElement}>
                <div id="sheet-music" style={sheetMusicCardStyles}>
                    <img src={sheetMusic} alt="sheet music" /> 
                </div>
                <div id="melody-section" style={sectionStyles}>
                    <div id="melody-section-bg">
                        <img src={trebleClef} alt="treble clef" id="treble-clef"/> 
                        <img src={baseClef} alt="base clef" id="base-clef"/> 
                    </div>
                    <div className="primary">
                        <SectionTitle 
                            title="Melody"
                            isVisible={sectionTextVisible}
                            keywords={APP_KEYWORDS}
                            position={sectionTitlePosition}
                            displayedOverDarkBackground={true}
                            viewportWidth={viewportWidth}
                        />

                        <p className={appDescriptionCSSClassName}>
                            Search artists, tracks, and lyrics with this simple, responsive prototype web app. 
                        </p>
                             
                        <div className="app-link-wrapper" style={appLinkStyles}>
                            <AppLink
                                href={MELODY_APP_HREF}
                                title="Search"
                                linkType={APP_LINK_TYPE.simple}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

MelodySection.propTypes = {

    //
    // Required in order to set the text alignment of the SectionTitle
    // Normally would just use CSS, but this SectionTitle styling differs
    // from other SectionTitles in its text-alignment behavior.
    //
    viewportWidth: PT.number.isRequired,

    desktopScrollPosition: PT.number.isRequired,
};

export default MelodySection;
