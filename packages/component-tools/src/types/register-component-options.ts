/**
 * Options for registering a component
 */
export interface RegisterComponentOptions {
  /**
   * Framework (react, react-native)
   */
  framework?: 'react' | 'react-native';

  /**
   * Override component name
   */
  name?: string;

  /**
   * Component description
   */
  description?: string;

  /**
   * Component dependencies
   * An array of strings
   */
  dependencies?: string[];

  /**
   * File type for registry
   */
  fileType?: string;

  /**
   * Register only to local registry (skip remote)
   */
  localOnly?: boolean;

  /**
   * Additional options
   */
  [key: string]: unknown;
}
