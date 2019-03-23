import React from 'react';

import SectionTitle from '../SectionTitle/SectionTitle';
import AppLink from '../../AppLink/AppLink';

import {
    SECTION_TITLE_POSITION,
} from '../../../constants/constants';

const APP_KEYWORDS = [
    'JavaScript',
    '<canvas>',
    'Udacity'
];

class TrickOrTreatSection extends React.Component {

    render() {
        return (
            <div id="trick-or-treat-section">
                <div className="primary">
                     
                    <SectionTitle
                        title="Trick-or-Treat"
                        keywords={APP_KEYWORDS}
                        position={SECTION_TITLE_POSITION.center}
                        displayedOverDarkBackground={true}></SectionTitle>

                    <p className="app-description">
                        Help Jack find the candy corn he lost while trick-or-treating! 
                    </p>
                    <p className="udacity-credit">
                        Built atop a game engine provided by 
                        <a href="javascript:;">
                            Udacity 
                        </a>,
                       from whom I took and completed a 
                        <a href="javascript:;"
                            className="udacity-fed-link">
                            Front-end Developer 
                        </a> 
                        course.
                    </p>
                </div>
                 
            </div>
        );
    }
}

export default TrickOrTreatSection;
