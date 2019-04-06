//
// This file contains functionality shared across the section components.
// Stored here to eliminate code duplication.
//

import {
    MIN_VIEWPORT_WIDTH_FOR_DESKTOP_UI,
} from '../../constants/constants';

/**
 * @param min {number} - The minimum value of the range.
 * @param max {number} - The maximum value of the range.
 * @param value {number} - The value to test.
 * @returns `true` iff value is in [min, max]
 */
function inRange(min, max, value) {
    if ( min > max ) {
        // swap values
        [ min, max ] = [ max, min ];
    }

    return value >= min && value <= max;
}

/**
 * @param scrollPosition {number} - The distance from the top of the section to
 * the top of the viewport.
 * @returns `true` iff the section should update itself for the current
 * page scroll position
 */
export function insideScrollRangeForUpdates(currentScrollPosition) {

    const { viewportHeight } = this.props;
    const { sectionHeight } = this.state;

    const sectionIsVisibleInViewport =
        ( -sectionHeight < currentScrollPosition ) &&
        ( currentScrollPosition < viewportHeight );
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
