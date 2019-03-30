import React from 'react';

import SectionTitle from '../SectionTitle/SectionTitle';

import oxoIconMobile from '../../../assets/img/oxo-mobile.png';
import oxoIconTablet from '../../../assets/img/oxo-tablet.png';
import oxoIconDesktop from '../../../assets/img/oxo-desktop.png';

import {
    APP_LINK_TYPE,
    SECTION_TITLE_POSITION,
} from '../../../constants/constants';

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

class OXOSection extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            screenshotVisible: false,
        };

        this.handleWindowScroll = this.handleWindowScroll.bind(this);

        this.sectionHTMLElement = React.createRef();
    }

    updateParallaxForSectionScrollPosition(position) {

        const screenshotVisible = ( position < SCREENSHOT_VISIBILITY_THRESHOLD );
        this.setState({ screenshotVisible });
    }

    handleWindowScroll() {
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
            screenshotVisible
        } = this.state;

        const screenshotWrapperClassName = ( screenshotVisible ? 'visible' : '' );

        return (
            <div id="oxo-section" ref={this.sectionHTMLElement}>

                <SectionTitle 
                    title="OXO"
                    keywords={APP_KEYWORDS}
                    position={SECTION_TITLE_POSITION.center}
                />

                <p className="app-description">
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

export default OXOSection;
