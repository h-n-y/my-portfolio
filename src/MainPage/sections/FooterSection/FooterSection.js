import React from 'react';
import * as Section from '../shared';

import Link from '../../Link/Link';

import {
    LINK_TYPE,
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

/**
 * The footer of the portfolio page. Includes a call to action along with
 * email, resume, and GitHub links.
 */
class FooterSection extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sectionTextVisible: false,
        };

        this.handleWindowScroll = this.handleWindowScroll.bind(this);

        this.sectionHTMLElement = React.createRef();
    }

    /**
     * Displays the section text if scroll position is below threshold.
     * @param position {number} - The distance of the top of the section from
     * the viewport.
     */
    conditionallyDisplaySectionTextForScrollPosition(position) {

        if ( this.state.sectionTextVisible ) { return; }
        if ( position < TEXT_DISPLAY_SCROLL_THRESHOLD ) {
            this.setState({ sectionTextVisible: true });
        }
    }

    /**
     * Window 'scroll' event listener. Updates section text visibility if necessary.
     */
    handleWindowScroll() {
        const sectionHTMLElement = this.sectionHTMLElement.current;
        const { top } = sectionHTMLElement.getBoundingClientRect();

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
        emailLinkCSSClassName,
        credentialsLinkCSSClassName;


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

            credentialsLinkCSSClassName = toCSSClassName([
                'link-wrapper',
                ( sectionTextVisible ? CSS_ANIMATION.fadeInFromBottom : '' ),
            ]);
        }

        return (
            <footer id="footer-section" ref={this.sectionHTMLElement}>
                <p className={paragraphCSSClassName}>
                    I am looking to join an excellent software team that will
                   help me grow into a professional developer. 
                </p>
                <p className={paragraphCSSClassName}>
                    If you like what you see or want to know more, I&apos;m always
                   available at 
                </p>

                <div id="email-link-wrapper" className={emailLinkCSSClassName}>
                    <a className="email-link" href="mailto:hnyelek@gmail.com">
                        hnyelek <span>@</span> gmail <span>.</span> com
                    </a>
                </div>

                <div id="my-credentials-links">
                    <div className={credentialsLinkCSSClassName}>
                        <Link
                            linkType={LINK_TYPE.gitHub} 
                            lightTheme={true} /> 
                    </div>
                    <div className={credentialsLinkCSSClassName}>
                        <Link
                            linkType={LINK_TYPE.resume}
                            lightTheme={true} />
                    </div>
                </div>
            </footer>
        );
    }
}

export default FooterSection;
