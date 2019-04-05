import React from 'react';
import PT from 'prop-types';

import externalLinkIcon from '../../assets/icons/external-link@2x.png';
import externalLinkLightIcon from '../../assets/icons/external-link-light@2x.png';

import {
    APP_LINK_TYPE
} from '../../constants/constants';

/**
 * A link to the web page of a portfolio project.
 */
class AppLink extends React.Component {

    /**
     * @returns The appropriate arrow icon and css class for the link type.
     */
    propertiesForAppLinkType(linkType) {
        const properties = {
            icon: null,
            cssClassName: 'app-link '
        };

        switch( linkType ) {
            case APP_LINK_TYPE.clear:
                properties.icon = externalLinkIcon;
                properties.cssClassName += 'type-clear';
                break;

            case APP_LINK_TYPE.standard:
                properties.icon = externalLinkLightIcon;
                properties.cssClassName += 'type-standard';
                break;

            case APP_LINK_TYPE.simple:
                properties.icon = externalLinkLightIcon;
                properties.cssClassName += 'type-simple';
                break;

            default:
                console.warn(`link type "${linkType}" is not recognized!`);
                properties.icon = externalLinkIcon;
        }

        return properties;
    }

    render() {
        const { title, linkType } = this.props;

        const { icon, cssClassName } = this.propertiesForAppLinkType(linkType);

        return (
                <a className={cssClassName}>

                    <span className="background"></span>
                    <span className="title"> {title.toUpperCase()} </span> 
                    <img src={icon} alt="arrow icon" />
                </a>
        );
    }
}

AppLink.propTypes = {
    title: PT.string.isRequired,
    linkType: PT.string.isRequired,
};

export default AppLink;
