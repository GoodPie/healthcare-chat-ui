import React from 'react';

/**
 * Props for the Avatar component
 */
export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The content of the component
   */
  children?: React.ReactNode;

  /**
   * Additional CSS class names
   */
  className?: string;
}
