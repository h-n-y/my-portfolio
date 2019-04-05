//
// This file contains utility functions useful throughout the application.
//

/**
 * Converts an array of strings to a single, space-separated string
 * for a CSS class.
 * @param names {string[]} - The array of strings to convert to a CSS class.
 * @returns A CSS class name string from the given names.
 */
export function toCSSClassName(names) {
    // remove empty strings
    names = names.filter(name => name);

    return names.join(' ');
}
