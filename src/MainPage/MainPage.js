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

const HEADER_IS_FIXED_THRESHOLD = -500/*px*/;
const SHOW_FIXED_HEADER_SCROLL_THRESHOLD = -1000/*px*/;
const HIDE_FIXED_HEADER_SCROLL_THRESHOLD = -4600/*px*/;

class MainPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            viewportWidth: 0,
            headerShouldBeFixed: false,
            fixedHeaderShouldBeVisible: true,
        };

        this.handleViewportResize = this.handleViewportResize.bind(this);
        this.handleWindowScroll = this.handleWindowScroll.bind(this);

        this.mainPageHTMLElement = React.createRef();
    }

    updatePageHeaderForScrollPosition(position) {

        if ( position > HEADER_IS_FIXED_THRESHOLD ) {
            //
            // Header should *NOT* be fixed, but should instead scroll up
            // with the page
            //
            if ( this.state.headerShouldBeFixed ) {
                this.setState({ headerShouldBeFixed: false });
            }
            return;
        }

        //
        // Header should be fixed
        //
        if ( !this.state.headerShouldBeFixed ) {
            this.setState({ headerShouldBeFixed: true });
        }

        //
        // Check if the fixed header should be visible.
        // The header should hide when user scrolls near the bottom of the ( desktop ) page.
        // The threshold number is near the page bottom.
        //
        
        //const fixedHeaderShouldBeVisible = position >= HIDE_FIXED_HEADER_SCROLL_THRESHOLD;
        const fixedHeaderShouldBeVisible =
            position < SHOW_FIXED_HEADER_SCROLL_THRESHOLD &&
            position > HIDE_FIXED_HEADER_SCROLL_THRESHOLD;

        //
        // Update state if necessary.
        //
        const fixedHeaderVisibilityStateNeedsUpdated =
            ( fixedHeaderShouldBeVisible && !this.state.fixedHeaderShouldBeVisible ) ||
            ( !fixedHeaderShouldBeVisible && this.state.fixedHeaderShouldBeVisible );
        if ( fixedHeaderVisibilityStateNeedsUpdated ) {
            this.setState({ fixedHeaderShouldBeVisible });
        }
    }

    handleViewportResize(e) {
        const viewportWidth = e.target.innerWidth;
        this.setState({ viewportWidth });
    }

    handleWindowScroll() {

        const pageElement = this.mainPageHTMLElement.current;
        const { top } = pageElement.getBoundingClientRect();

        console.log(`main page: ${top}px`);
        this.updatePageHeaderForScrollPosition(top);
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

        //
        // Listen for scroll events on the window
        //
        window.addEventListener('scroll', this.handleWindowScroll);
    }

    render() {
        const {
            viewportWidth,
            headerShouldBeFixed,
            fixedHeaderShouldBeVisible,
        } = this.state;

        const headerCSSClassName = toCSSClassName([
            ( headerShouldBeFixed ? 'fixed' : '' ),
            ( fixedHeaderShouldBeVisible ? 'fixed--visible' : '' ),
        ]);

        return (
            <div id="main-page-wrapper" ref={this.mainPageHTMLElement}>
                <header className={headerCSSClassName}>
                    <Link
                        linkType={LINK_TYPE.resume} />  
                    <Link
                        linkType={LINK_TYPE.gitHub} />
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
