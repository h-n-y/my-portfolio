import React from 'react';

import IntroSection from './sections/IntroSection/IntroSection';
import RouletteSection from './sections/RouletteSection/RouletteSection';
import TrickOrTreatSection from './sections/TrickOrTreatSection/TrickOrTreatSection';
import MelodySection from './sections/MelodySection/MelodySection';

class MainPage extends React.Component {

    render() {
        return (
            <main id="main-page">
                     
                <IntroSection />
                <RouletteSection />
                <TrickOrTreatSection />
                <MelodySection />
            </main>
        );
    }
}

MainPage.propTypes = {
};

export default MainPage;
