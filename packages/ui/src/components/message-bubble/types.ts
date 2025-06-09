import React from 'react';

/**
 * Props for the MessageBubble component
 */
export interface MessageBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The content of the component
   */
  children?: React.ReactNode;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Whether the message is from the user
   */
  isOwnMessage?: boolean;

  /**
   * Status of the message (e.g., 'sent', 'received', 'error')
   */
  status: 'pending' | 'sent' | 'received' | 'error';

  /**
   * Timestamp of the message
   */
  timestamp: Date;

  /**
   * The message text
   */
  message: string;

}
