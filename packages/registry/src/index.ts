
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
  type ComponentMetadata
} from "./schemas";

// Export config types
export {
  type RegistryConfig,
  defaultConfig
} from "./types/config";

// Export utility functions
export {
  loadConfig
} from "./utils/config";

export {
  validateComponentMetadata
} from "./utils/validation";

// Export register functionality
export {
  registerComponent
} from "./utils/register";

export {
  registerComponent as registerComponentFromDir,
  type RegisterComponentOptions
} from "./commands/register";

// Export component creation functionality
export {
  createComponent,
  type CreateComponentOptions
} from "./tools/component-creator";

// Export metadata generation functionality
export {
  generateMetadata,
  type GenerateMetadataOptions
} from "./tools/metadata-generator";

// Export dependency analysis functionality
export {
  analyzeDependencies,
  analyzeRegistryDependencies,
  type FileWithContent,
  type DetectedDependencies
} from "./tools/dependency-analyzer";

// Export commands
export { registerCommand } from "./commands/register";
export { createComponentCommand } from "./commands/create-component";
export { validateCommand } from "./commands/validate";
export { docsCommand } from "./commands/docs";
