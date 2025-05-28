/**
 * Hook for formatting messages in healthcare chat applications
 * 
 * @packageDocumentation
 */

import { useMemo } from 'react';
import { formatMessagePreview, sanitizeText } from '../utils/string-utils';

/**
 * Options for message formatting
 */
export interface MessageFormatterOptions {
  /**
   * Maximum length for message previews
   */
  previewLength?: number;
  
  /**
   * Whether to sanitize message text
   */
  sanitize?: boolean;
  
  /**
   * Whether to format markdown in messages
   */
  formatMarkdown?: boolean;
}

/**
 * Hook that provides message formatting utilities
 * 
 * @param options - Configuration options for the formatter
 * @returns Object containing message formatting functions
 */
export function useMessageFormatter(options: MessageFormatterOptions = {}) {
  const {
    previewLength = 50,
    sanitize = true,
    formatMarkdown = true
  } = options;
  
  return useMemo(() => {
    /**
     * Creates a preview of a message
     */
    const createPreview = (message: string): string => {
      let result = message;
      
      if (sanitize) {
        result = sanitizeText(result);
      }
      
      return formatMessagePreview(result, previewLength);
    };
    
    /**
     * Formats a full message for display
     */
    const formatMessage = (message: string): string => {
      let result = message;
      
      if (sanitize) {
        result = sanitizeText(result);
      }
      
      if (formatMarkdown) {
        // Simple markdown formatting
        // In a real implementation, you might use a library like marked
        result = result
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/~~(.*?)~~/g, '<del>$1</del>')
          .replace(/`(.*?)`/g, '<code>$1</code>')
          .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
      }
      
      return result;
    };
    
    return {
      createPreview,
      formatMessage
    };
  }, [previewLength, sanitize, formatMarkdown]);
}
