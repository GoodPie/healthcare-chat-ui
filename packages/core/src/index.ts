/**
 * Core package for Healthcare Chat UI Kit
 *
 * This package provides shared utilities, hooks, and types for building
 * healthcare chat interfaces.
 *
 * @packageDocumentation
 */

// Export types
export {type ComponentMetadata} from './types/component-metadata';
export {type FileWithContent} from './types/file-with-content';
export {type RegistryConfig, defaultConfig, defaultPlatform} from "./types/registry-config";

// Export utilities
export * from './utils/string-utils';
export {
  type Logger,
  consoleLogger
} from "./utils/logger";

// Export validation utilities
export * from './utils/validations';

// Export error classes
export {
  BaseError,
  ValidationError,
  ConfigurationError,
  ComponentError,
  NetworkError
} from './utils/errors';

// Export Result pattern
export {
  type Result,
  Success,
  Failure,
  success,
  failure,
  parseWithZod,
  tryCatch,
  tryCatchSync
} from './utils/result';

// Export hooks
export * from './hooks/useMessageFormatter';
