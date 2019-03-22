import React from 'react';
import PT from 'prop-types';

import arrowIcon from '../../assets/icons/arrow@2x.png';
import whiteArrowIcon from '../../assets/icons/arrow-white@2x.png';

import {
    APP_LINK_TYPE
} from '../../constants/constants';

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
                properties.icon = arrowIcon;
                properties.cssClassName += 'type-clear';
                break;

            case APP_LINK_TYPE.standard:
                properties.icon = whiteArrowIcon;
                properties.cssClassName += 'type-standard';
                break;

            case APP_LINK_TYPE.simple:
                properties.icon = whiteArrowIcon;
                properties.cssClassName += 'type-simple';
                break;

            default:
                console.warn(`link type "${linkType}" is not recognized!`);
                properties.icon = arrowIcon;
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
