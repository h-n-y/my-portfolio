import React from 'react';
import PT from 'prop-types';

import SectionTitle from '../SectionTitle/SectionTitle';
import AppLink from '../../AppLink/AppLink';

// images
import trebleClef from '../../../assets/svg/treble.svg';
import baseClef from '../../../assets/svg/base.svg';

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

    sectionTitlePositionForViewportWidth(width) {
        if ( width < 600 ) {
            return SECTION_TITLE_POSITION.right;
        }

        return SECTION_TITLE_POSITION.center;
    }

    render() {

        const { viewportWidth } = this.props;
        const sectionTitlePosition = this.sectionTitlePositionForViewportWidth(viewportWidth);

        return (
            <div id="melody-section">
                <div id="melody-section-bg">
                    <img src={trebleClef} alt="treble clef" id="treble-clef"/> 
                    <img src={baseClef} alt="base clef" id="base-clef"/> 
                </div>
                <div className="primary">
                    <SectionTitle 
                        title="Melody"
                        keywords={APP_KEYWORDS}
                        position={sectionTitlePosition}
                        displayedOverDarkBackground={true}
                    />

                    <p className="app-description">
                        Search artists, tracks, and lyrics with this simple, responsive prototype web app. 
                    </p>
                         
                    <div className="app-link-wrapper">
                        <AppLink
                            title="Search"
                            linkType={APP_LINK_TYPE.simple}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

MelodySection.propTypes = {

    //
    // Required in order to set the text alignment of the SectionTitle
    // Normally would just use CSS, but this SectionTitle styling differs
    // from other SectionTitles in its text-alignment behavior.
    //
    viewportWidth: PT.number.isRequired,
};

export default MelodySection;
