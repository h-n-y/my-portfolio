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

class OXOSection extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            screenshotLoaded: false,
        };

        this.handleScreenshotImageLoad = this.handleScreenshotImageLoad.bind(this);
    }

    handleScreenshotImageLoad() {
        this.setState({ screenshotLoaded: true });
    }

    render() {

        const screenshotWrapperClassName = ( this.state.screenshotLoaded ? 'img-loaded' : '' );

        return (
            <div id="oxo-section">

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
                     
                    <img src={oxoIconMobile} alt="oxo screenshot" className="mobile"
                        onLoad={this.handleScreenshotImageLoad}/>
                    <img src={oxoIconTablet} alt="oxo screenshot" className="tablet"
                        onLoad={this.handleScreenshotImageLoad}/>
                    <img src={oxoIconDesktop} alt="oxo screenshot" className="desktop"
                        onLoad={this.handleScreenshotImageLoad}/>
                </div>

                <div id="oxo-trailer-section">

                    <div id="oxo-video-wrapper">
                        <iframe  src="https://www.youtube.com/embed/bjkJCgwsfvU" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>

                     
                </div>
                 
            </div>
       );
    }
}

export default OXOSection;
