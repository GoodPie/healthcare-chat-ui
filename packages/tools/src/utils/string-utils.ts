/**
 * Converts a string to kebab-case
 * @param value - The string to convert
 */
export const toKebabCase = (value: string): string => {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}
