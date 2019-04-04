import React from 'react';
import PT from 'prop-types';
import * as Section from '../shared';

import SectionTitle from '../SectionTitle/SectionTitle';
import AppLink from '../../AppLink/AppLink';

import oxoIcon from '../../../assets/icons/oxo-icon.png';
import oxoScreenshotsMobile from '../../../assets/img/oxo-mobile.png';
import oxoScreenshotsTablet from '../../../assets/img/oxo-tablet.png';
import oxoScreenshotsDesktop from '../../../assets/img/oxo-desktop.png';

import {
    APP_LINK_TYPE,
    CSS_ANIMATION,
    SECTION_TITLE_POSITION,
    MIN_VIEWPORT_WIDTH_FOR_TABLET_PORTRAIT_UI,
    MIN_VIEWPORT_WIDTH_FOR_DESKTOP_UI,
} from '../../../constants/constants';

import {
    toCSSClassName,
} from '../../../utility/utility';

const APP_KEYWORDS = [
    'iOS',
    'Objective-C',
    'tic tac toe',
];

//
// Screenshot is kept hidden until OXO section is less than
// this many pixels from the top of the viewport.
//
const SCREENSHOT_VISIBILITY_THRESHOLD = -100/*px*/;

/*
 * When the distance between the top of the viewport and the top of this section
 * falls under this threshold, the section text is animated into view.
 */
const TEXT_DISPLAY_SCROLL_THRESHOLD = 300/*px*/;

class OXOSection extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sectionTextVisible: false,
            screenshotVisible: false,
        };

        this.handleWindowScroll = this.handleWindowScroll.bind(this);

        this.sectionHTMLElement = React.createRef();
    }

    getOXOScreenshotsSource() {
        const { viewportWidth } = this.props;

        if ( viewportWidth < MIN_VIEWPORT_WIDTH_FOR_TABLET_PORTRAIT_UI ) {
            return oxoScreenshotsMobile;
        }

        if ( viewportWidth < MIN_VIEWPORT_WIDTH_FOR_DESKTOP_UI ) {
            return oxoScreenshotsTablet;
        }

        return oxoScreenshotsDesktop;
    }

    updateParallaxForSectionScrollPosition(position) {

        if ( this.state.screenshotVisible ) { return; }
        const screenshotVisible = ( position < SCREENSHOT_VISIBILITY_THRESHOLD );
        this.setState({ screenshotVisible });
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

    handleWindowScroll() {
        const sectionHTMLElement = this.sectionHTMLElement.current;
        const { top } = sectionHTMLElement.getBoundingClientRect();

        this.updateParallaxForSectionScrollPosition(top);
        this.conditionallyDisplaySectionTextForScrollPosition(top);

        console.log(`*** ${top}`);
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
            screenshotVisible
        } = this.state;

        const screenshotWrapperClassName = ( screenshotVisible ? 'visible' : '' );


        let 
            appFeatureItemCSSClassName,
            appIconWrapperCSSClassName,
            appDescriptionCSSClassName = 'app-description',
            sectionTitlePosition = SECTION_TITLE_POSITION.center;


        const oxoScreenshots = this.getOXOScreenshotsSource();

        //
        // Check if desktop-specific styles need to be added
        //
        const shouldDisplayDesktopUI = Section.shouldDisplayDesktopUI.call(this);
        if ( shouldDisplayDesktopUI ) {

            sectionTitlePosition = SECTION_TITLE_POSITION.left;

            appIconWrapperCSSClassName = ( sectionTextVisible ? CSS_ANIMATION.fadeInFromBottom : '' );

            appDescriptionCSSClassName = toCSSClassName([
                'app-description',
                ( sectionTextVisible ? CSS_ANIMATION.fadeInFromBottom : '' ),
            ]);

            appFeatureItemCSSClassName = toCSSClassName([
                ( sectionTextVisible ? CSS_ANIMATION.fadeInFromBottom : '' ),
            ]);

        }

        return (
            <div id="oxo-section" ref={this.sectionHTMLElement}>

                <div className="top-section">
                    <div id="oxo-icon-wrapper"
                        className={appIconWrapperCSSClassName}>
                        <img src={oxoIcon} alt="oxo app icon" />
                    </div>
                    <div className="text-content">
                         
                        <SectionTitle 
                            title="OXO"
                            keywords={APP_KEYWORDS}
                            position={sectionTitlePosition}
                            isVisible={sectionTextVisible}
                            viewportWidth={this.props.viewportWidth}
                        />

                        <p className={appDescriptionCSSClassName}>
                            Play a classic game - tic tac toe - with a minimalist finish
                            and pleasing animations. 
                        </p>
                        <ul id="oxo-features-list">
                            <li className={appFeatureItemCSSClassName}>
                                Previously on the App Store 
                            </li> 
                            <li className={appFeatureItemCSSClassName}>
                                AI opponent uses custom game tree for decision making 
                            </li>
                            <li className={appFeatureItemCSSClassName}>
                                Release trailer created with iMovie 
                            </li>
                        </ul>
                    </div>
                </div>

                <figure id="oxo-screenshot-wrapper"
                    className={screenshotWrapperClassName}>

                    <img src={oxoScreenshots} alt="oxo screenshot"/>
                    <figcaption>
                        OXO screenshots  
                    </figcaption>
                </figure>

                {/* RELEASE TRAILER LINK */}
                <div id="oxo-trailer-link-wrapper">
                    <AppLink
                        title="View Release Trailer"
                        linkType={APP_LINK_TYPE.clear}
                    />
                </div>

                {/*
                <div id="oxo-trailer-section">

                    <div id="oxo-video-wrapper">
                        <iframe  src="https://www.youtube.com/embed/bjkJCgwsfvU" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>

                     
                </div>
                */}
                 
            </div>
       );
    }
}

OXOSection.propTypes = {
    viewportWidth: PT.number.isRequired,
};

export default OXOSection;
