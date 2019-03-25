import React from 'react';

import IntroSection from './sections/IntroSection/IntroSection';
import RouletteSection from './sections/RouletteSection/RouletteSection';
import TrickOrTreatSection from './sections/TrickOrTreatSection/TrickOrTreatSection';
import MelodySection from './sections/MelodySection/MelodySection';
import OXOSection from './sections/OXOSection/OXOSection';
import FooterSection from './sections/FooterSection/FooterSection';

class MainPage extends React.Component {

    render() {
        return (
            <main id="main-page">
                     
                <IntroSection />
                <RouletteSection />
                <TrickOrTreatSection />
                <MelodySection />
                <OXOSection />
                <FooterSection />
            </main>
        );
    }
}

MainPage.propTypes = {
};

export default MainPage;
