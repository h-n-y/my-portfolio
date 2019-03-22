import React from 'react';
import PT from 'prop-types';

/**
 * Displays an application's name, along with keywords naming
 * any technolgies or themes associated with the app.
 */
class SectionTitle extends React.Component {

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

        return (
            <section className="section-title">

                {/* APP TITLE */}
                <h2>
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

SectionTitle.propTypes = {
    title: PT.string.isRequired,
    keywords: PT.arrayOf(PT.string).isRequired,
};

export default SectionTitle;
