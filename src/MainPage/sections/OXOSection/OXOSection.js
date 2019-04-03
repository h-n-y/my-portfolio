import React from 'react';
import PT from 'prop-types';
import * as Section from '../shared';

import SectionTitle from '../SectionTitle/SectionTitle';

import oxoIconMobile from '../../../assets/img/oxo-mobile.png';
import oxoIconTablet from '../../../assets/img/oxo-tablet.png';
import oxoIconDesktop from '../../../assets/img/oxo-desktop.png';

import {
    APP_LINK_TYPE,
    CSS_ANIMATION,
    SECTION_TITLE_POSITION,
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
const SCREENSHOT_VISIBILITY_THRESHOLD = 60/*px*/;

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

    updateParallaxForSectionScrollPosition(position) {

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

        //console.log(`*** ${top}`);
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


        let appDescriptionCSSClassName = 'app-description';

        //
        // Check if desktop-specific styles need to be added
        //
        if ( Section.shouldDisplayDesktopUI.call(this) ) {

            appDescriptionCSSClassName = toCSSClassName([
                'app-description',
                ( sectionTextVisible ? CSS_ANIMATION.fadeInFromBottom : '' ),
            ]);
        }

        return (
            <div id="oxo-section" ref={this.sectionHTMLElement}>

                <SectionTitle 
                    title="OXO"
                    keywords={APP_KEYWORDS}
                    position={SECTION_TITLE_POSITION.center}
                    isVisible={sectionTextVisible}
                    viewportWidth={this.props.viewportWidth}
                />

                <p className={appDescriptionCSSClassName}>
                    Play a classic game - tic tac toe - with a minimalist finish
                    and pleasing animations. 
                </p>

                <div id="oxo-screenshot-wrapper"
                    className={screenshotWrapperClassName}>
                     
                    <img src={oxoIconMobile} alt="oxo screenshot" className="mobile-only" />
                    <img src={oxoIconTablet} alt="oxo screenshot" className="tablet-only" />
                    <img src={oxoIconDesktop} alt="oxo screenshot" className="desktop-only" />
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
