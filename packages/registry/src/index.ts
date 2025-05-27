

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

export {
  ComponentMetadataSchema,
  type ComponentMetadata
} from "@/schemas";

export {
  registerComponent
} from "@/utils/register";
