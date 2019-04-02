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
    CSS_ANIMATION,
    SECTION_TITLE_POSITION,
} from '../../../constants/constants';

import {
    toCSSClassName,
} from '../../../utility/utility';

const APP_KEYWORDS = [
    'JavaScript',
    '<canvas>',
    'Udacity'
];

/*
 * When the distance between the top of the viewport and the top of this section
 * falls under this threshold, the section text is animated into view.
 */
const TEXT_DISPLAY_SCROLL_THRESHOLD = 200/*px*/;
const JACK_DISPLAY_SCROLL_THRESHOLD = TEXT_DISPLAY_SCROLL_THRESHOLD;

class TrickOrTreatSection extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sectionTextVisible: false,
            udacityCreditVisible: false,
            jackAndCandyVisible: false,
            sectionTransformY: 0,
            udacityCreditTransformY: 0,
        };

        this.handleWindowScroll = this.handleWindowScroll.bind(this);

        this.sectionHTMLElement = React.createRef();
    }

    sectionTitlePositionForViewportWidth(width) {
        if ( width < 600 ) {
            return SECTION_TITLE_POSITION.center;
        }

        return SECTION_TITLE_POSITION.right;
    }

    /**
     * NOTE: a copy/paste from RouletteSection
     */
    conditionallyDisplaySectionTextForScrollPosition(position) {


        //
        // Udacity credit
        //
        if ( position < 0 && !this.state.udacityCreditVisbile ) {
            this.setState({ udacityCreditVisible: true });
        }

        //
        // App description
        //
        if ( this.state.sectionTextVisible ) { return; }
        if ( position < TEXT_DISPLAY_SCROLL_THRESHOLD ) {
            this.setState({ sectionTextVisible: true });
        }
    }

    conditionallyDisplayJackForScrollPosition(position) {
        if ( this.state.jackAndCandyVisible ) { return; }
        if ( position < JACK_DISPLAY_SCROLL_THRESHOLD ) {
            this.setState({ jackAndCandyVisible: true });
        }
    }

    conditionallyDisplayAppLinkForScrollPosition(position) {
    }

    updateParallaxForSectionScrollPosition(position) {

        const sectionTransformY = 0.4 * position;
        const udacityCreditTransformY = Math.max(0, -0.4 * position);

        this.setState({
            sectionTransformY,
            udacityCreditTransformY,
        });
    }

    handleWindowScroll(e) {

        const sectionHTMLElement = this.sectionHTMLElement.current;
        const { top } = sectionHTMLElement.getBoundingClientRect();

        this.updateParallaxForSectionScrollPosition(top);
        this.conditionallyDisplaySectionTextForScrollPosition(top);
        this.conditionallyDisplayJackForScrollPosition(top);
        this.conditionallyDisplayAppLinkForScrollPosition(top);
    }

    componentDidMount() {

        //
        // Listen for scroll events on the window
        //
        window.addEventListener('scroll', this.handleWindowScroll);
    }

    render() {

        const {
            sectionTextVisible,
            sectionTransformY,
            udacityCreditVisible,
            udacityCreditTransformY,
            jackAndCandyVisible,
        } = this.state;
        const { viewportWidth } = this.props;
        const sectionTitlePosition = this.sectionTitlePositionForViewportWidth(viewportWidth);

        const sectionStyles = {
            transform: `translateY(${sectionTransformY}px)`,
        };

        const udacityCreditStyles = {
            transform: `translateY(${udacityCreditTransformY}px)`,
            opacity: ( udacityCreditVisible ? 1 : 0 ),
        };

        const appDescriptionCSSClassName = toCSSClassName([
            'app-description',
            ( sectionTextVisible ? CSS_ANIMATION.fadeInFromRight : '' ),
        ]);

        const jackAndCandyCSSClassName = toCSSClassName([
            ( jackAndCandyVisible ? CSS_ANIMATION.fadeIn : '' )
        ]);

        return (
            <div id="trick-or-treat-section-wrapper"
                ref={this.sectionHTMLElement}>
                <div id="grey-panel-desktop-bg"></div>
                    
                <div id="trick-or-treat-section"
                    style={sectionStyles}>
                    <div id="jack-and-candy"
                        className={jackAndCandyCSSClassName}
                        >
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
                            isVisible={sectionTextVisible}
                            title="Trick-or-Treat"
                            keywords={APP_KEYWORDS}
                            position={sectionTitlePosition}
                            displayedOverDarkBackground={true} />
                         

                        <img src={Jack} alt="Jack" className="tot-jack mobile-only"/> 

                        <p className={appDescriptionCSSClassName}>
                            Help Jack find the candy corn he lost while trick-or-treating! 
                        </p>
                        <p className="udacity-credit"
                            style={udacityCreditStyles}>
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
