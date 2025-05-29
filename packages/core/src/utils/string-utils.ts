/**
 * String utility functions for healthcare chat applications
 * 
 * @packageDocumentation
 */

/**
 * Truncates a string to a specified length and adds an ellipsis if truncated
 * 
 * @param text - The string to truncate
 * @param maxLength - The maximum length of the string
 * @returns The truncated string with ellipsis if needed
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
}

/**
 * Formats a message preview by removing markdown, HTML, and truncating
 * 
 * @param message - The message text to format
 * @param maxLength - The maximum length of the preview
 * @returns A clean, truncated message preview
 */
export function formatMessagePreview(message: string, maxLength: number = 50): string {
  // Remove markdown formatting
  let preview = message
    .replace(/\*\*(.*?)\*\*/g, '$1') // Bold
    .replace(/\*(.*?)\*/g, '$1')     // Italic
    .replace(/~~(.*?)~~/g, '$1')     // Strikethrough
    .replace(/```(.*?)```/gs, '$1')  // Code blocks
    .replace(/`(.*?)`/g, '$1')       // Inline code
    .replace(/\[(.*?)\]\(.*?\)/g, '$1'); // Links

  // Remove HTML tags
  preview = preview.replace(/<[^>]*>/g, '');
  
  // Truncate and add ellipsis if needed
  return truncateText(preview, maxLength);
}

/**
 * Sanitizes text for safe display in healthcare contexts
 * 
 * @param text - The text to sanitize
 * @returns Sanitized text safe for display
 */
export function sanitizeText(text: string): string {
  // Replace potentially harmful characters
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Formats a patient name according to healthcare standards
 * 
 * @param firstName - Patient's first name
 * @param lastName - Patient's last name
 * @param middleName - Patient's middle name (optional)
 * @returns Formatted patient name
 */
export function formatPatientName(
  firstName: string, 
  lastName: string, 
  middleName?: string
): string {
  if (middleName) {
    return `${lastName}, ${firstName} ${middleName.charAt(0)}.`;
  }
  return `${lastName}, ${firstName}`;
}
