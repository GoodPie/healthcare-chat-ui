import * as fs from 'node:fs';
import * as path from 'node:path';
import {z} from 'zod';
import {ComponentMetadataSchema} from '@/schemas';

/**
 * Register a component in the registry
 * @param componentData - The component metadata
 * @param platform - The platform (react, react-native)
 * @returns The path to the registered component
 */
export async function registerComponent(
  componentData: z.infer<typeof ComponentMetadataSchema>,
  platform: 'react' | 'react-native' = 'react'
): Promise<string> {
  // Validate the component data
  const parseResult = ComponentMetadataSchema.safeParse(componentData);
  if (!parseResult.success) {
    throw new Error(`Invalid component metadata: ${parseResult.error.message}`);
  }

  // Get the registry base path
  const registryBasePath = path.resolve(__dirname, '../components');

  // Create component directory if it doesn't exist
  const componentDir = path.join(registryBasePath, componentData.name);
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, {recursive: true});
  }

  // Create the platform-specific JSON file
  const componentFilePath = path.join(componentDir, `${platform}.json`);
  fs.writeFileSync(componentFilePath, JSON.stringify(componentData, null, 2));

  console.log(`✅ Registered ${componentData.name} component for ${platform}`);

  // Return the relative path to the component (used by getComponentPath)
  return path.relative(registryBasePath, componentFilePath);
}
