import { z } from 'zod'

// Component metadata schema
export const ComponentMetadataSchema = z.object({
  name: z.string(),
  type: z.string(),
  description: z.string(),
  dependencies: z.array(z.string()),
  devDependencies: z.array(z.string()),
  registryDependencies: z.array(z.string()),
  files: z.array(z.object({
    name: z.string(),
    content: z.string(),
    type: z.string()
  })),
  tailwind: z.object({
    config: z.object({
      theme: z.object({
        extend: z.object({
          colors: z.record(z.any())
        })
      })
    })
  }).optional()
})

export type ComponentMetadata = z.infer<typeof ComponentMetadataSchema>

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