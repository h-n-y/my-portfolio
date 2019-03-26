import React from 'react';

import SectionTitle from '../SectionTitle/SectionTitle';
import AppLink from '../../AppLink/AppLink';

import rouletteDesignDesaturated from '../../../assets/img/roulette-design-desaturated.png';
import rouletteDesign1 from '../../../assets/img/roulette-example-1.png';
import rouletteDesign2 from '../../../assets/img/roulette-example-2.png';
import rouletteDesign3 from '../../../assets/img/roulette-example-3.png';

import {
    APP_LINK_TYPE,
} from '../../../constants/constants';

const APP_KEYWORDS = [
    'React',
    '<canvas>',
    'art'
];

class RouletteSection extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            rouletteImageLoadedFlags: [ false, false, false ],
        };

        this.handleImageLoad = this.handleImageLoad.bind(this);
    }

    handleImageLoad(rouletteImageIndex) {

        const flags = this.state.rouletteImageLoadedFlags;
        const flagsUpdated = flags.slice(0, flags.length);
        flags[rouletteImageIndex] = true;

        this.setState({ rouletteImageLoadedFlags: flagsUpdated });
    }

    render() {
        return (

            <div id="roulette-section">

                <div id="roulette-bg-design-wrapper">
                    <img src={rouletteDesignDesaturated} alt="roulette design"
                        onLoad={this.handleImageLoad} /> 
                </div>
                 
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
                        <img src={rouletteDesign1} alt="roulette example"
                            onLoad={this.handleImageLoad} /> 
                    </div>
                    <div className="image-card">
                        <img src={rouletteDesign2} alt="roulette example"
                            onLoad={this.handleImageLoad} /> 
                    </div>
                </div>
            </div>
        );
    }
}

export default RouletteSection;
