import React from 'react';

import IntroSection from './sections/IntroSection/IntroSection';
import RouletteSection from './sections/RouletteSection/RouletteSection';
import TrickOrTreatSection from './sections/TrickOrTreatSection/TrickOrTreatSection';

class MainPage extends React.Component {

    render() {
        return (
            <main id="main-page">
                     
                <IntroSection />
                <RouletteSection />
                <TrickOrTreatSection />
            </main>
        );
    }
}

MainPage.propTypes = {
};

export default MainPage;
