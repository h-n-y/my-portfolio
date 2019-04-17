import React from 'react';

import IntroSection from './sections/IntroSection/IntroSection';
import RouletteSection from './sections/RouletteSection/RouletteSection';
import TrickOrTreatSection from './sections/TrickOrTreatSection/TrickOrTreatSection';
import MelodySection from './sections/MelodySection/MelodySection';
import OXOSection from './sections/OXOSection/OXOSection';
import FooterSection from './sections/FooterSection/FooterSection';
import Link from './Link/Link';

import {
    LINK_TYPE,
    SECTION_DESKTOP_SCROLL_POSITION,
} from '../constants/constants';

/**
 * In order to reduce the number of function calls made while scrolling,
 * each section of the page only updates its scroll-based state properties
 * in a restricted range. The range for each section represents the distance
 * of the top of the section from the top of the viewport.
 * @constant
 */
/*
const SCROLL_RANGE_FOR_UPDATES = {
    introSection: {
        min: -1100,
        max: 0
    },
    rouletteSection: {
        min: -450,
        max: 1200
    },
    trickOrTreatSection: {
        min: -460,
        max: 800
    },
    melodySection: {
        min: -150,
        max: 1000
    },
};
*/

/**
 * The main page of the portfolio.
 */
class MainPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            viewportWidth: 0/*px*/,
            viewportHeight: 0/*px*/,
        };

        this.handleViewportResize = this.handleViewportResize.bind(this);
    }


    /**
     * Updates the viewport width state property.
     * @param e - The resize event.
     */
    handleViewportResize(e) {
        const { target } = e;
        const viewportWidth = target.innerWidth;
        const viewportHeight = target.innerHeight;

        this.setState({
            viewportWidth,
            viewportHeight,
        });
    }

    componentDidMount() {

        //
        // Set the initial viewport width
        //
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        this.setState({
            viewportWidth,
            viewportHeight,
        });

        //
        // Register listener for changes to the viewport size:
        //
        window.addEventListener('resize', this.handleViewportResize);
    }

    render() {
        const { viewportWidth, viewportHeight } = this.state;

        return (
            <div id="main-page-wrapper">
                <header>
                    <Link
                        linkType={LINK_TYPE.gitHub} />
                    <Link
                        linkType={LINK_TYPE.resume} />  
                </header>
                     
                <main id="main-page">
                         
                    <IntroSection 
                        viewportWidth={viewportWidth}
                        viewportHeight={viewportHeight}
                        desktopScrollPosition={SECTION_DESKTOP_SCROLL_POSITION.intro} />
                    <RouletteSection
                        desktopScrollPosition={SECTION_DESKTOP_SCROLL_POSITION.roulette}
                        viewportWidth={viewportWidth}
                        viewportHeight={viewportHeight} />
                    <TrickOrTreatSection
                        viewportHeight={viewportHeight}
                        viewportWidth={viewportWidth}
                        desktopScrollPosition={SECTION_DESKTOP_SCROLL_POSITION.trickOrTreat}/>
                    <MelodySection
                        viewportHeight={viewportHeight}
                        viewportWidth={viewportWidth}
                        desktopScrollPosition={SECTION_DESKTOP_SCROLL_POSITION.melody}/>
                    <OXOSection
                        viewportWidth={viewportWidth}/>
                    <FooterSection 
                        viewportWidth={viewportWidth}/>
                </main>
            </div>
        );
    }
}

export default MainPage;
