import React from 'react';
import PT from 'prop-types';

import downloadIcon from '../../assets/icons/download@2x.png';
import downloadLightIcon from '../../assets/icons/download-light@2x.png';
import externalLinkIcon from '../../assets/icons/external-link@2x.png';
import externalLinkLightIcon from '../../assets/icons/external-link-light@2x.png';

import {
    LINK_TYPE,
} from '../../constants/constants';

import {
    toCSSClassName,
} from '../../utility/utility';

function ResumeLink(props) {

    //const icon = props.lightTheme ? downloadLightIcon : downloadIcon;
    const { lightTheme, linkType } = props;

    let
        linkTitle,
        linkIcon;
    //
    // Get the appropriate title and icon for link type:
    //
    switch ( linkType ) {
        case LINK_TYPE.resume:
            linkTitle = 'Resume';
            linkIcon = ( lightTheme ? downloadLightIcon : downloadIcon );
            break;

        case LINK_TYPE.gitHub:
            linkTitle = 'GitHub';
            linkIcon = ( lightTheme ? externalLinkLightIcon : externalLinkIcon );
            break;

        default:
            console.warn(`link type "${linkType}" is not recognized!`);
    }

    const linkCSSClassName = toCSSClassName([
        'link-component',
        ( lightTheme ? 'theme--light' : '' )
    ]);

    return (
        <a className={linkCSSClassName}>
            <span className="link-label"> {linkTitle} </span> 
            <img src={linkIcon} alt="link icon" />
        </a>
    );
}

ResumeLink.defaultProps = {
    lightTheme: false,
};

ResumeLink.propTypes = {
    lightTheme: PT.bool.isRequired,
    linkType: PT.string.isRequired, // expected to be a property of LINK_TYPE constant.
};

export default ResumeLink;
