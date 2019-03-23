import React from 'react';

import SectionTitle from '../SectionTitle/SectionTitle';
import AppLink from '../../AppLink/AppLink';

import {
    APP_LINK_TYPE,
} from '../../../constants/constants';

const APP_KEYWORDS = [
    'React',
    '<canvas>',
    'art'
];

class RouletteSection extends React.Component {

    render() {
        return (

            <div id="roulette-section">
                 
                <div className="primary">
                    <SectionTitle
                        title="Roulette"
                        keywords={APP_KEYWORDS}>
                    </SectionTitle>

                    <p className="app-description">
                        <span>
                            Create and export 
                        </span>
                        <span>
                            magnificent designs with this 
                        </span>
                        <span>
                            roulette drawing tool for 
                        </span>
                        <span>
                            desktop.
                        </span>
                    </p>

                    <AppLink
                        title="create"
                        linkType={APP_LINK_TYPE.clear} />
                </div>

                <div className="image-cards">
                     
                    <div className="image-card">
                         
                    </div>
                    <div className="image-card">
                         
                    </div>
                </div>
            </div>
        );
    }
}

export default RouletteSection;
