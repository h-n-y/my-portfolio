import React from 'react';

import SectionTitle from '../SectionTitle/SectionTitle';

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

    render() {
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
                 
            </div>
       );
    }
}

export default OXOSection;
