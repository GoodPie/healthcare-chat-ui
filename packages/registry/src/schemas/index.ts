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
  version: z.string().optional(),
  author: z.string().optional(),
  license: z.string().optional(),
  tags: z.array(z.string()).optional()
})

export type ComponentMetadata = z.infer<typeof ComponentMetadataSchema>
