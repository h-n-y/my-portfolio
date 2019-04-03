import React from 'react';
import PT from 'prop-types';
import * as Section from '../shared';

import {
    SECTION_TITLE_POSITION,
    CSS_ANIMATION,
} from '../../../constants/constants';

import {
    toCSSClassName,
} from '../../../utility/utility';

/**
 * Displays an application's name, along with keywords naming
 * any technolgies or themes associated with the app.
 */
class SectionTitle extends React.Component {

    cssClassNameForComponent() {
        const { displayedOverDarkBackground, position } = this.props;

        const defaultClassName = 'section-title';

        //
        // class name for the background type
        //
        const backgroundClassName = ( displayedOverDarkBackground ? 'dark-background' : '' );

        //
        //  class name for title position
        //
        let positionClassName;
        switch ( position ) {

            case SECTION_TITLE_POSITION.left:
                positionClassName = 'align-left';
                break;

            case SECTION_TITLE_POSITION.center:
                positionClassName =  'align-center';
                break;

            case SECTION_TITLE_POSITION.right:
                positionClassName = 'align-right';
                break;

            default:
                console.warn(`Title position "${position}" is not recognized!`);
                positionClassName = 'align-left';
        }

        const cssClassName = [ defaultClassName, backgroundClassName, positionClassName ].join(' ');
        return cssClassName;
    }

    render() {
        const { title, keywords, isVisible } = this.props;

        //
        // Convert keywords to list items.
        //
        const keywordListItems = keywords.map((keyword, i) => {
            const isLastKeyword = ( i === keywords.length - 1 );
            return (
                <li key={i}>
                    {keyword + ( isLastKeyword ? '' : ',' ) } 
                </li>
            );
        });

        const cssClassName = this.cssClassNameForComponent();

        let
            titleCSSClassName = 'title',
            appKeywordsCSSClassName = 'app-keywords',
            dividerCSSClassName = 'title-keyword-divider';

        //
        // Check if desktop-specific styles need to be added
        //
        if ( Section.shouldDisplayDesktopUI.call(this) ) {

            titleCSSClassName = toCSSClassName([
                'title',
                ( isVisible ? CSS_ANIMATION.fadeInFromBottom : '' ),
            ]);
            appKeywordsCSSClassName = toCSSClassName([
                'app-keywords',
                ( isVisible ? CSS_ANIMATION.fadeInFromBottom : '' ),
            ]);
            dividerCSSClassName = toCSSClassName([
                'title-keyword-divider',
                ( isVisible ? CSS_ANIMATION.scaleXUpFromZero : '' ),
            ]);
        }

        return (
            <section className={cssClassName}>

                {/* APP TITLE */}
                <h2 className={titleCSSClassName}>
                    { title }                             
                </h2> 

                <div className={dividerCSSClassName}></div>

                {/* KEYWORDS */}
                <ul className={appKeywordsCSSClassName}>
                    {keywordListItems} 
                </ul>


            </section>
        );
    }
}

SectionTitle.defaultProps = {
    displayedOverDarkBackground: false,
    position: SECTION_TITLE_POSITION.left,
    isVisible: false,
};

SectionTitle.propTypes = {
    title: PT.string.isRequired,
    keywords: PT.arrayOf(PT.string).isRequired,
    position: PT.string.isRequired,

    displayedOverDarkBackground: PT.bool.isRequired,
    viewportWidth: PT.number.isRequired,
};

export default SectionTitle;
