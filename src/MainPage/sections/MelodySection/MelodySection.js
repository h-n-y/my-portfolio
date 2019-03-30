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
    SECTION_TITLE_POSITION,
} from '../../../constants/constants';

const APP_KEYWORDS = [
    'Angular 2+',
    '3rd-party API',
    'music'
];

class MelodySection extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
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

    updateParallaxForSectionScrollPosition(position) {

        const sectionTransformY = 0.6 * position - 400;
        const sheetMusicCardTransformY = 0.4 * position - 400;
        //const appLinkTransformY = -sheetMusicCardTransformY;
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
    }

    componentDidMount() {

        //
        // Listen for scroll events on the window
        //
        window.addEventListener('scroll', this.handleWindowScroll);
    }

    render() {

        const { 
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
                            keywords={APP_KEYWORDS}
                            position={sectionTitlePosition}
                            displayedOverDarkBackground={true}
                        />

                        <p className="app-description">
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
