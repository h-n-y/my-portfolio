import React from 'react';
import PT from 'prop-types';

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

/*
 * When the distance between the top of the viewport and the top of this section
 * falls under this threshold, the section text is animated into view.
 */
const TEXT_DISPLAY_SCROLL_THRESHOLD = 500/*px*/;

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
    conditionallyDisplaySectionTextForScrollPosition(position) {
        if ( this.state.sectionTextVisible ) { return; }
        if ( position < TEXT_DISPLAY_SCROLL_THRESHOLD ) {
            this.setState({ sectionTextVisible: true });
        }
    }

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

    handleWindowScroll(e) {

        const sectionHTMLElement = this.sectionHTMLElement.current;
        const { top } = sectionHTMLElement.getBoundingClientRect();

        this.updateParallaxForSectionScrollPosition(top);
        this.conditionallyDisplaySectionTextForScrollPosition(top);
    }

    componentDidMount() {

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

        const sectionStyles = {
            transform: `translateY(${sectionTransformY}px)`,
        };

        const sheetMusicCardStyles = {
            transform: `translateY(${sheetMusicCardTransformY}px)`,
        };

        const appLinkStyles = {
            transform: `translateY(${appLinkTransformY}px)`,
        };

        const appDescriptionCSSClassName = toCSSClassName([
            'app-description',
            ( sectionTextVisible ? CSS_ANIMATION.fadeInFromBottom : '' ),
        ]);

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
                        />

                        <p className={appDescriptionCSSClassName}>
                            Search artists, tracks, and lyrics with this simple, responsive prototype web app. 
                        </p>
                             
                        <div className="app-link-wrapper" style={appLinkStyles}>
                            <AppLink
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
};

export default MelodySection;
