import {
    MIN_VIEWPORT_WIDTH_FOR_DESKTOP_UI,
} from '../../constants/constants';

function inRange(min, max, value) {
    if ( min > max ) {
        // swap values
        [ min, max ] = [ max, min ];
    }

    return value >= min && value <= max;
}

export function insideScrollRangeForUpdates(scrollPosition) {
    const { min, max } = this.props.scrollRangeForUpdates;
    /*
    console.log('checking scroll range...');
    console.log(`min: ${min}\tmax: ${max}`);
    */
    return inRange(min, max, scrollPosition);
}

export function shouldDisplayDesktopUI() {

    return ( this.props.viewportWidth >= MIN_VIEWPORT_WIDTH_FOR_DESKTOP_UI );
}
