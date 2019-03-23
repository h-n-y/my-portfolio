import React from 'react';
import PT from 'prop-types';

import {
    SECTION_TITLE_POSITION,
} from '../../../constants/constants';

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
        const { title, keywords } = this.props;

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

        return (
            <section className={cssClassName}>

                {/* APP TITLE */}
                <h2 className="title">
                    { title }                             
                </h2> 

                <div className="title-keyword-divider"></div>

                {/* KEYWORDS */}
                <ul className="app-keywords">
                    {keywordListItems} 
                </ul>


            </section>
        );
    }
}

SectionTitle.defaultProps = {
    displayedOverDarkBackground: false,
    position: SECTION_TITLE_POSITION.left,
};

SectionTitle.propTypes = {
    title: PT.string.isRequired,
    keywords: PT.arrayOf(PT.string).isRequired,
    position: PT.string.isRequired,

    displayedOverDarkBackground: PT.bool.isRequired,
};

export default SectionTitle;
