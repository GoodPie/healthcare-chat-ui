import fs from 'fs-extra';
import path from 'path';
import { ComponentMetadata, validateComponentMetadata } from '@healthcare-chat/registry';

// Helper function to fetch component from remote registry
export async function fetchComponentFromUrl(url: string, componentName: string, framework: 'react' | 'react-native'): Promise<ComponentMetadata> {
  const fullUrl = `${url}/${framework}/${componentName}/${framework}.json`;

  try {
    // For Node.js environments, you might want to use node-fetch or similar
    const response = await fetch(fullUrl);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return validateComponentMetadata(data);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to fetch component from ${fullUrl}: ${errorMessage}`);
  }
}

// Helper function to load component from local registry
export function loadComponentFromLocal(registryPath: string, componentName: string, framework: 'react' | 'react-native'): ComponentMetadata {
  const componentPath = path.join(registryPath, componentName, `${framework}.json`);

  if (!fs.existsSync(componentPath)) {
    throw new Error(`Component "${componentName}" not found at ${componentPath}`);
  }

  try {
    const rawData = JSON.parse(fs.readFileSync(componentPath, 'utf8'));
    return validateComponentMetadata(rawData);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to parse component metadata: ${errorMessage}`);
  }
}
