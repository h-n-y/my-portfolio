import React from 'react';
import PT from 'prop-types';

class IntroSection extends React.Component {

    render() {
        return (
            <section id="intro-section">
                <h1>
                    <span> Hi, </span> 
                    <span> I&apos;m Hans.  </span>
                </h1> 
                <p>
                    <span>
                        I&apos;m a growing 
                    </span> 
                    <span>
                        <strong> front-end </strong> and <strong> iOS </strong> developer.
                    </span>
                    <span>
                        Scroll down to see examples
                    </span>
                    <span>
                        of my work: 
                    </span>
                </p>
            </section>
        );
    }
}

IntroSection.propTypes = {
};

export default IntroSection;
