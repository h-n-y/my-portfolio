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

    //
    // LIFECYCLE HOOKS
    //

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

    //
    // RENDER
    //

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
