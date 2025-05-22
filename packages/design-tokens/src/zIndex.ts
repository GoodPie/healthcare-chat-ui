/**
 * Z-index tokens for the Healthcare Chat UI Kit
 * Following WCAG 2.1 guidelines for focus management and modal dialogs
 */

export type ZIndexKey = '0' | '10' | '20' | '30' | '40' | '50' | 'auto';

export const zIndex: Record<ZIndexKey, string> = {
  '0': '0',
  '10': '10',
  '20': '20',
  '30': '30',
  '40': '40',
  '50': '50',
  auto: 'auto',
};

/**
 * Get z-index value by key
 */
export const getZIndex = (key: ZIndexKey): string => zIndex[key];

/**
 * Tailwind-compatible z-index scale
 */
export const zIndexScale = {
  '0': 'z-0',
  '10': 'z-10',
  '20': 'z-20',
  '30': 'z-30',
  '40': 'z-40',
  '50': 'z-50',
  auto: 'z-auto',
};

/**
 * NativeWind-compatible z-index scale
 */
export const zIndexScaleNative = {
  '0': 'z-0',
  '10': 'z-10',
  '20': 'z-20',
  '30': 'z-30',
  '40': 'z-40',
  '50': 'z-50',
  auto: 'z-auto',
}; 