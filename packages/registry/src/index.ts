
// Registry paths
export const REGISTRY_PATH = {
  COMPONENTS: 'components',
  TEMPLATES: 'templates'
} as const

// Helper functions
export function getComponentPath(name: string, platform: 'react' | 'react-native'): string {
  return `${REGISTRY_PATH.COMPONENTS}/${name}/${platform}.json`
}

export function getTemplatePath(name: string): string {
  return `${REGISTRY_PATH.TEMPLATES}/${name}.json`
}

// Export schemas and types
export {
  ComponentMetadataSchema,
} from "./schemas";


// Export utility functions
export {
  loadConfig
} from "./utils/config";

export {
  validateComponentMetadata
} from "./utils/validation";

// Export client functions
export {
  fetchComponentFromUrl,
  loadComponentFromLocal
} from "./utils/client";

// Export register functionality
export {
  registerComponent
} from "./utils/register";

export {
  registerComponent as registerComponentFromDir,
} from "./commands/register";

export {
  type RegisterComponentOptions
} from "./types/register-component-options";


// Export register command
export { registerCommand } from "./commands/register";
