export function toCSSClassName(names) {
    names = names.filter(name => name);
    return names.join(' ');
}
