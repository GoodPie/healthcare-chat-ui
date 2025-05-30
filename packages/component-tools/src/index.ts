// Export constants
export const REGISTRY_PATH = {
  COMPONENTS: 'components',
  TEMPLATES: 'templates'
} as const;

// Export schemas and types
export * from './schemas';

// Export utility functions
export * from './utils/string-utils';
export * from './utils/validations';
export * from './utils/config';
export * from './utils/validation';
export * from './utils/client';
export { registerComponent as registerComponentInRegistry } from './utils/register';

export {type RegisterComponentOptions} from "./types/register-component-options"

// Export tools
export * from './tools';

// Export commands
export * from './commands/create-component';
export * from './commands/validate';
export * from './commands/docs';
export { registerComponent as registerComponentFromDir, registerCommand } from './commands/register';
