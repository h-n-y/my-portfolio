//
// This file contains functionality shared across the section components.
// Stored here to eliminate code duplication.
//

import {
    MIN_VIEWPORT_WIDTH_FOR_DESKTOP_UI,
} from '../../constants/constants';


/**
 * @param scrollPosition {number} - The distance from the top of the section to
 * the top of the viewport.
 * @returns `true` iff the section should update itself for the current
 * page scroll position
 */
export function insideScrollRangeForUpdates(currentScrollPosition, scrollPadding) {

    scrollPadding = scrollPadding || 0;

    const { viewportHeight } = this.props;
    const { sectionHeight } = this.state;

    const sectionIsVisibleInViewport =
        ( -sectionHeight - scrollPadding < currentScrollPosition ) &&
        ( currentScrollPosition < viewportHeight + scrollPadding );
    return sectionIsVisibleInViewport;
}

/**
 * @returns `true` if the viewport is wide enough to display the desktop UI.
 */
export function shouldDisplayDesktopUI() {

    return ( this.props.viewportWidth >= MIN_VIEWPORT_WIDTH_FOR_DESKTOP_UI );
}

export function setSectionHeight() {
    const sectionHTMLElement = this.sectionHTMLElement.current;
    const sectionHeight = sectionHTMLElement.offsetHeight;

    this.setState({ sectionHeight });
}
