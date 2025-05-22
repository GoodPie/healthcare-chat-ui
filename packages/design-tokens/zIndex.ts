/**
 * Z-index tokens for the Healthcare Chat UI Kit
 * Following WCAG 2.1 guidelines for focus management and modal dialogs
 */

export type ZIndexKey = 'auto' | 'base' | 'dropdown' | 'sticky' | 'fixed' | 'modal' | 'popover' | 'tooltip' | 'toast';

export const zIndex: Record<ZIndexKey, number> = {
  auto: 0,          // Default stacking context
  base: 1,          // Base layer
  dropdown: 1000,   // Dropdown menus
  sticky: 1020,     // Sticky headers
  fixed: 1030,      // Fixed elements
  modal: 1040,      // Modal dialogs
  popover: 1050,    // Popovers
  tooltip: 1060,    // Tooltips
  toast: 1070,      // Toast notifications
};

/**
 * Get z-index value by key
 */
export const getZIndex = (key: ZIndexKey): number => zIndex[key];

/**
 * Tailwind-compatible z-index scale
 */
export const zIndexScale = {
  auto: 'z-auto',
  base: 'z-base',
  dropdown: 'z-dropdown',
  sticky: 'z-sticky',
  fixed: 'z-fixed',
  modal: 'z-modal',
  popover: 'z-popover',
  tooltip: 'z-tooltip',
  toast: 'z-toast',
};

/**
 * NativeWind-compatible z-index scale
 */
export const zIndexScaleNative = {
  auto: 'z-auto',
  base: 'z-base',
  dropdown: 'z-dropdown',
  sticky: 'z-sticky',
  fixed: 'z-fixed',
  modal: 'z-modal',
  popover: 'z-popover',
  tooltip: 'z-tooltip',
  toast: 'z-toast',
}; 