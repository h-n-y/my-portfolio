//
// CONSTANTS
//

/**
 * Types assignable to the AppLink component.
 * Each AppLink type has a unique style and animation on hover.
 * @constant
 */
export const APP_LINK_TYPE = {

    /*
     * The background rectangle of link expands to the right on hover.
     */
    standard: 'standard',

    /*
     * The background rectangle expands to the right and disappears on hover while
     * a box shadow appears on its border
     */
    clear: 'clear',

    /*
     * A static button with full-width background, box shadow, and no animation
     * on hover.
     */
    simple: 'simple',
};

/**
 * Types for the Link component.
 * Each Link type has a unique label and icon
 * @constant
 */
export const LINK_TYPE = {
    resume: 'resume',
    gitHub: 'github',
};

/**
 * Text alignment positions for the SectionTitle component.
 * @constant
 */
export const SECTION_TITLE_POSITION = {
    left: 'left',
    center: 'center',
    right: 'right',
};

/**
 * CSS animation class names.
 * @constant
 */
export const CSS_ANIMATION = {
    fadeIn: 'animation--fade-in',
    fadeInFromLeft: 'animation--fade-in-from-left',
    fadeInFromRight: 'animation--fade-in-from-right',
    fadeInFromBottom: 'animation--fade-in-from-bottom',
    scaleXUpFromZero: 'animation--scale-x-up-from-zero',
    hideSkull: 'animation--hide-skull',
    hidePumpkin: 'animation--hide-pumpkin',
};

/**
 * The minimum viewport width for tablet portrait layouts.
 * @constant
 */
export const MIN_VIEWPORT_WIDTH_FOR_TABLET_PORTRAIT_UI = 600/*px*/;

/**
 * The minimum viewport width for desktop layouts.
 * @constant
 */
export const MIN_VIEWPORT_WIDTH_FOR_DESKTOP_UI = 1200/*px*/;
