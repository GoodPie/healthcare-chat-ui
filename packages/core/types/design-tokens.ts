export interface Colors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface Typography {
  fontFamily: string;
  fontSize: Record<string, string>;
  fontWeight: Record<string, number>;
  lineHeight: Record<string, string>;
}

export interface Spacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface BorderRadius {
  sm: string;
  md: string;
  lg: string;
  full: string;
}

export interface Shadows {
  sm: string;
  md: string;
  lg: string;
}

export interface Transitions {
  fast: string;
  normal: string;
  slow: string;
  // Add more transition properties as needed
}

export interface ZIndex {
  dropdown: number;
  sticky: number;
  fixed: number;
  modal: number;
}

export interface Breakpoints {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface DesignTokens {
  colors: Colors;
  typography: Typography;
  spacing: Spacing;
  borderRadius: BorderRadius;
  shadows: Shadows;
  transitions: Transitions;
  zIndex: ZIndex;
  breakpoints: Breakpoints;
}
