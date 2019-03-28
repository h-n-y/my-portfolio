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
            rouletteImageLoadedFlags: [ false, false, false, false ],
        };

        this.handleImageLoad = this.handleImageLoad.bind(this);
    }

    handleImageLoad(rouletteImageIndex) {

        console.log(`image ${rouletteImageIndex} loaded`);
        const flags = this.state.rouletteImageLoadedFlags;
        const flagsUpdated = flags.slice(0, flags.length);
        flagsUpdated[rouletteImageIndex] = true;

        this.setState({ rouletteImageLoadedFlags: flagsUpdated });
    }

    render() {

        const [ 
            bgDesignVisible,
            roulette1Visible, 
            roulette2Visible, 
            roulette3Visible
        ] = this.state.rouletteImageLoadedFlags;

        return (

            <div id="roulette-section">

                <div id="roulette-bg-design-wrapper">
                    <img src={rouletteDesignDesaturated} alt="roulette design"
                        onLoad={() => this.handleImageLoad(0)} 
                        className={bgDesignVisible ? 'visible' : ''}/> 
                </div>
                 
                <div className="primary">
                    <SectionTitle
                        title="Roulette"
                        keywords={APP_KEYWORDS}>
                    </SectionTitle>

                    <p className="app-description">
                            Create and download magnificent designs with this roulette drawing tool for desktop. 
                    </p>

                    <AppLink
                        title="create"
                        linkType={APP_LINK_TYPE.clear} />
                </div>

                <div className="image-cards">
                     
                    <div className="image-card">
                        <img src={rouletteDesign1} alt="roulette example"
                            onLoad={() => this.handleImageLoad(1)} 
                            className={roulette1Visible ? 'visible' : ''} 
                        /> 
                    </div>
                    <div className="image-card">
                        <img src={rouletteDesign2} alt="roulette example"
                            onLoad={() => this.handleImageLoad(2)}
                            className={roulette2Visible ? 'visible' : ''} 
                        />
                    </div>

                    <div className="image-card">
                        <img src={rouletteDesign3} alt="roulette example"
                            onLoad={() => this.handleImageLoad(3)}
                            className={roulette2Visible ? 'visible' : ''} 
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default RouletteSection;
