import React from 'react';
import PT from 'prop-types';

import IntroSection from './IntroSection/IntroSection';
import RouletteSection from './RouletteSection/RouletteSection';

class MainPage extends React.Component {

    render() {
        return (
            <main id="main-page">
                     
                <IntroSection />
                <RouletteSection />
            </main>
        );
    }
}

MainPage.propTypes = {
};

export default MainPage;
