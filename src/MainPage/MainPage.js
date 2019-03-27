import React from 'react';

import IntroSection from './sections/IntroSection/IntroSection';
import RouletteSection from './sections/RouletteSection/RouletteSection';
import TrickOrTreatSection from './sections/TrickOrTreatSection/TrickOrTreatSection';
import MelodySection from './sections/MelodySection/MelodySection';
import OXOSection from './sections/OXOSection/OXOSection';
import FooterSection from './sections/FooterSection/FooterSection';

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
        const { viewportWidth } = this.state;

        return (
            <main id="main-page">
                     
                <IntroSection />
                <RouletteSection />
                <TrickOrTreatSection
                    viewportWidth={viewportWidth}/>
                <MelodySection
                    viewportWidth={viewportWidth}/>
                <OXOSection />
                <FooterSection />
            </main>
        );
    }
}

export default MainPage;
