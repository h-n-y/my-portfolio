import React from 'react';
import PT from 'prop-types';

import SectionTitle from '../SectionTitle/SectionTitle';
import AppLink from '../../AppLink/AppLink';

// images
import Jack from '../../../assets/img/jack.png';
import pumpkin from '../../../assets/img/pumpkin.png';
import skull from '../../../assets/img/skull.png';
import candy from '../../../assets/img/candy-corn.png';

import {
    APP_LINK_TYPE,
    SECTION_TITLE_POSITION,
} from '../../../constants/constants';

const APP_KEYWORDS = [
    'JavaScript',
    '<canvas>',
    'Udacity'
];

class TrickOrTreatSection extends React.Component {

    sectionTitlePositionForViewportWidth(width) {
        if ( width < 600 ) {
            return SECTION_TITLE_POSITION.center;
        }

        return SECTION_TITLE_POSITION.right;
    }

    render() {

        const { viewportWidth } = this.props;
        const sectionTitlePosition = this.sectionTitlePositionForViewportWidth(viewportWidth);

        return (
            <div id="trick-or-treat-section">
                <div id="jack-and-candy">
                    <img src={Jack} alt="Jack" className="tot-jack"/> 
                    <div className="app-link-wrapper">
                        <AppLink
                            title="Help"
                            linkType={APP_LINK_TYPE.standard} />
                    </div>
                    <img src={candy} alt="candy corn" className="tot-candy"/>
                </div>

                <div className="primary">
                    <SectionTitle
                        title="Trick-or-Treat"
                        keywords={APP_KEYWORDS}
                        position={sectionTitlePosition}
                        displayedOverDarkBackground={true} />
                     

                    <img src={Jack} alt="Jack" className="tot-jack mobile-only"/> 

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

                    {/* mobile candy corn image */}
                    <img src={candy} alt="candy corn" className="tot-candy mobile-only"/>

                    <div className="app-link-wrapper mobile-only">
                        <AppLink
                            title="Help"
                            linkType={APP_LINK_TYPE.standard} />
                    </div>
                </div>

                {/* skulls and pumpkins */}
                <div id="skulls-and-pumpkins">
                    <img src={skull} alt="skull" className="tot-skull"/> 
                    <img src={pumpkin} alt="pumpkin" className="tot-pumpkin"/> 
                    <img src={skull} alt="skull" className="tot-skull"/> 
                </div>
                 
            </div>

        );
    }
}

TrickOrTreatSection.propTypes = {

    //
    // Required in order to set the text alignment of the SectionTitle
    // Normally would just use CSS, but this SectionTitle styling differs
    // from other SectionTitles in its text-alignment behavior.
    //
    viewportWidth: PT.number.isRequired,
};

export default TrickOrTreatSection;
