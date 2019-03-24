import React from 'react';

import SectionTitle from '../SectionTitle/SectionTitle';
import AppLink from '../../AppLink/AppLink';

import {
    APP_LINK_TYPE,
    SECTION_TITLE_POSITION,
} from '../../../constants/constants';

const APP_KEYWORDS = [
    'Angular 2+',
    '3rd-party API',
    'music'
];

class MelodySection extends React.Component {

    render() {

        return (
            <div id="melody-section">
                <SectionTitle 
                    title="Melody"
                    keywords={APP_KEYWORDS}
                    position={SECTION_TITLE_POSITION.right}
                />

                <p className="app-description">
                    Search artists, tracks, and lyrics with this simple, responsive prototype web app. 
                </p>
                     
                <AppLink
                    title="Search"
                    linkType={APP_LINK_TYPE.simple}
                />
            </div>
        );
    }
}

export default MelodySection;
