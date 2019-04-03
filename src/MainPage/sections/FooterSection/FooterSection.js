import React from 'react';
import * as Section from '../shared';

import {
    CSS_ANIMATION,
} from '../../../constants/constants';

import {
    toCSSClassName,
} from '../../../utility/utility';

/*
 * When the distance between the top of the viewport and the top of this section
 * falls under this threshold, the section text is animated into view.
 */
const TEXT_DISPLAY_SCROLL_THRESHOLD = 300/*px*/;

class FooterSection extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sectionTextVisible: false,
        };

        this.handleWindowScroll = this.handleWindowScroll.bind(this);

        this.sectionHTMLElement = React.createRef();
    }

    updateParallaxForSectionScrollPosition(position) {
        //console.log(`cta: ${position}px`);
    }

    conditionallyDisplaySectionTextForScrollPosition(position) {

        if ( this.state.sectionTextVisible ) { return; }
        if ( position < TEXT_DISPLAY_SCROLL_THRESHOLD ) {
            this.setState({ sectionTextVisible: true });
        }
    }

    handleWindowScroll() {
        const sectionHTMLElement = this.sectionHTMLElement.current;
        const { top } = sectionHTMLElement.getBoundingClientRect();

        this.updateParallaxForSectionScrollPosition(top);
        this.conditionallyDisplaySectionTextForScrollPosition(top);
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
        } = this.state;


        let
            paragraphCSSClassName,
            emailLinkCSSClassName;

        //
        // Check if desktop-specific styles need to be added
        //
        if ( Section.shouldDisplayDesktopUI.call(this) ) {

            paragraphCSSClassName = toCSSClassName([
                ( sectionTextVisible ? CSS_ANIMATION.fadeInFromBottom : '' ),
            ]);

            emailLinkCSSClassName = toCSSClassName([
                ( sectionTextVisible ? CSS_ANIMATION.fadeIn : '' ),
            ]);
        }

        return (
            <footer id="footer-section" ref={this.sectionHTMLElement}>
                <p className={paragraphCSSClassName}>
                    I am looking to join an excellent software team that will
                   help me grow into a professional developer. 
                </p>
                <p className={paragraphCSSClassName}>
                    If you like what you see or would like to know more, I&apos;m always
                   available at 
                </p>

                <div id="email-link-wrapper" className={emailLinkCSSClassName}>
                    <a href="javascript:;">
                        hnyelek <span>@</span> gmail <span>.</span> com
                    </a>
                </div>
            </footer>
        );
    }
}

export default FooterSection;
