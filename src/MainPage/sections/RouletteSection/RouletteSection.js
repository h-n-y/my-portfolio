import React from 'react';

import SectionTitle from '../SectionTitle/SectionTitle';
import AppLink from '../../AppLink/AppLink';

import rouletteDesignDesaturated from '../../../assets/img/roulette-design-desaturated.png';
import rouletteDesign1 from '../../../assets/img/roulette-example-1.png';
import rouletteDesign2 from '../../../assets/img/roulette-example-2.png';
import rouletteDesign3 from '../../../assets/img/roulette-example-3.png';

import {
    APP_LINK_TYPE,
    CSS_ANIMATION,
} from '../../../constants/constants';

import {
    toCSSClassName,
} from '../../../utility/utility';

const APP_KEYWORDS = [
    'React',
    '<canvas>',
    'art'
];

/*
 * When the distance between the top of the viewport and the top of this section
 * falls under this threshold, the section text is animated into view.
 */
const TEXT_DISPLAY_SCROLL_THRESHOLD = 450/*px*/;

class RouletteSection extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sectionTextVisible: false,
            rouletteImageLoadedFlags: [ false, false, false, false ],

            rouletteCard1TransformY: 0,
            rouletteCard2TransformY: 0,
            appLinkTransformY: 0,

            rouletteImage1TransformY: 0,
            rouletteImage2TransformY: 0,
        };

        this.handleImageLoad = this.handleImageLoad.bind(this);
        this.handleWindowScroll = this.handleWindowScroll.bind(this);

        this.sectionHTMLElement = React.createRef();
    }

    handleImageLoad(rouletteImageIndex) {

        console.log(`roulette ${rouletteImageIndex} loaded`);
        const flags = this.state.rouletteImageLoadedFlags;
        const flagsUpdated = flags.slice(0, flags.length);
        flagsUpdated[rouletteImageIndex] = true;

        this.setState({ rouletteImageLoadedFlags: flagsUpdated });
    }

    handleWindowScroll(e) {

        const sectionHTMLElement = this.sectionHTMLElement.current;
        const { top } = sectionHTMLElement.getBoundingClientRect();

        this.updateParallaxForSectionScrollPosition(top);
        this.conditionallyDisplaySectionTextForScrollPosition(top);
    }

    updateParallaxForSectionScrollPosition(position) {

        const rouletteCard1TransformY = 0.4 * position - 0;
        const rouletteCard2TransformY = 0.6 * position - 100;

        //const rouletteImage3TransformY = -1 * ( rouletteCard1TransformY / 4 );
        const rouletteImage3TransformY = -0.05 * position;

        const appLinkTransformY = -1 * ( 0.1 * position - 50 );

        this.setState({
            rouletteCard1TransformY,
            rouletteCard2TransformY,
            //rouletteImage1TransformY,
            rouletteImage3TransformY,
            appLinkTransformY,
        });
    }

    conditionallyDisplaySectionTextForScrollPosition(position) {
        if ( this.state.sectionTextVisible ) { return; }
        if ( position < TEXT_DISPLAY_SCROLL_THRESHOLD ) {
            this.setState({ sectionTextVisible: true });
        }
    }

    componentDidMount() {

        //
        // Listen for scroll events on the window.
        //
        window.addEventListener('scroll', this.handleWindowScroll);
    }

    render() {

        const [ 
            bgDesignVisible,
            roulette1Visible, 
            roulette2Visible, 
            roulette3Visible,

        ] = this.state.rouletteImageLoadedFlags;

        const {
            sectionTextVisible,
            rouletteCard1TransformY, 
            rouletteCard2TransformY, 
            rouletteImage3TransformY,
            appLinkTransformY,
        } = this.state;

        const rouletteCard1Styles = {
            transform: `translateY(${rouletteCard1TransformY}px)`,
        };

        const rouletteCard2Styles = {
            transform: `translateY(${rouletteCard2TransformY}px)`,
        };

        const rouletteImage3Styles = {
            transform: `translateY(${rouletteImage3TransformY}px)`,
        };

        const appLinkWrapperStyles = {
            transform: `translateY(${appLinkTransformY}px)`,
        };

        const appDescriptionCSSClassName = toCSSClassName([
            'app-description',
            ( sectionTextVisible ? CSS_ANIMATION.fadeInFromLeft : '' ),
        ]);

        console.log(appDescriptionCSSClassName);


        return (

            <div id="roulette-section" ref={this.sectionHTMLElement}>

                <div id="roulette-bg-design-wrapper">
                    <img src={rouletteDesignDesaturated} alt="roulette design"
                        onLoad={() => this.handleImageLoad(0)} 
                        className={bgDesignVisible ? 'visible' : ''}/> 
                </div>
                 
                <div className="primary">
                    <SectionTitle
                        title="Roulette"
                        keywords={APP_KEYWORDS}
                        isVisible={sectionTextVisible}
                    >
                    </SectionTitle>

                    <p className={appDescriptionCSSClassName}>
                            Create and download magnificent designs with this roulette drawing tool for desktop. 
                    </p>

                    <div className="app-link-wrapper" style={appLinkWrapperStyles}>
                        <AppLink
                            title="create"
                            linkType={APP_LINK_TYPE.clear} />
                    </div>
                </div>

                <div className="roulette-cards">
                     
                    <div className="roulette-card" style={rouletteCard1Styles}>
                        <img src={rouletteDesign1} alt="roulette example"
                            onLoad={() => this.handleImageLoad(1)} 
                            className={roulette1Visible ? 'visible' : ''} 
                        /> 
                    </div>
                    <div className="roulette-card" style={rouletteCard2Styles}>
                        <img src={rouletteDesign2} alt="roulette example"
                            onLoad={() => this.handleImageLoad(2)}
                            className={roulette2Visible ? 'visible' : ''} 
                        />
                    </div>

                    <div className="roulette-card">
                        <img src={rouletteDesign3} alt="roulette example"
                            style={rouletteImage3Styles}
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
