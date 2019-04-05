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
} from '../constants/constants';

import {
    toCSSClassName,
} from '../utility/utility';

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

class MainPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            viewportWidth: 0,
        };

        this.handleViewportResize = this.handleViewportResize.bind(this);
    }

    handleViewportResize(e) {
        const viewportWidth = e.target.innerWidth;
        this.setState({ viewportWidth });
    }

    componentDidMount() {

        //
        // Set the initial viewport width
        //
        const viewportWidth = window.innerWidth;
        this.setState({ viewportWidth });

        //
        // Register a listener for changes to the viewport:
        //
        window.addEventListener('resize', this.handleViewportResize);
    }

    render() {
        const { viewportWidth, } = this.state;

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
                        scrollRangeForUpdates={SCROLL_RANGE_FOR_UPDATES.introSection}
                        viewportWidth={viewportWidth}/>
                    <RouletteSection
                        scrollRangeForUpdates={SCROLL_RANGE_FOR_UPDATES.rouletteSection}
                        viewportWidth={viewportWidth}/>
                    <TrickOrTreatSection
                        viewportWidth={viewportWidth}
                        scrollRangeForUpdates={SCROLL_RANGE_FOR_UPDATES.trickOrTreatSection}/>
                    <MelodySection
                        viewportWidth={viewportWidth}
                        scrollRangeForUpdates={SCROLL_RANGE_FOR_UPDATES.melodySection}/>
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
