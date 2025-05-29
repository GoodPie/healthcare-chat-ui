/**
 * Component metadata types for Healthcare Chat UI Kit
 */


/**
 * Component metadata
 */
export interface ComponentMetadata {
  /**
   * Component name
   */
  name: string;

  /**
   * Component type
   */
  type: string;

  /**
   * Component description
   */
  description: string;

  /**
   * Runtime dependencies
   */
  dependencies: string[];

  /**
   * Development dependencies
   */
  devDependencies: string[];

  /**
   * Registry dependencies
   */
  registryDependencies: string[];

  /**
   * Component files
   */
  files: {
    /**
     * File name
     */
    name: string;

    /**
     * File content
     */
    content: string;

    /**
     * File type
     */
    type: string;
  }[];

  /**
   * Component version
   */
  version?: string;

  /**
   * Component author
   */
  author?: string;

  /**
   * Component license
   */
  license?: string;

  /**
   * Component tags
   */
  tags?: string[];
}
