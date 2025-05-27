import fs from 'fs-extra';
import path from 'path';
import { ComponentMetadata } from '@healthcare-chat/registry';

// Basic component file interface
export interface ComponentFile {
  name: string;
  content: string;
}

// Helper function to fetch component from remote registry
export async function fetchComponentFromUrl(url: string, componentName: string, framework: string): Promise<ComponentMetadata> {
  const fullUrl = `${url}/${framework}/${componentName}/${framework}.json`;

  try {
    // For Node.js environments, you might want to use node-fetch or similar
    const response = await fetch(fullUrl);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch component from ${fullUrl}: ${error}`);
  }
}

// Helper function to load component from local registry
export function loadComponentFromLocal(registryPath: string, componentName: string, framework: string): ComponentMetadata {
  const componentPath = path.join(registryPath, componentName, `${framework}.json`);

  if (!fs.existsSync(componentPath)) {
    throw new Error(`Component "${componentName}" not found at ${componentPath}`);
  }

  try {
    const componentData = JSON.parse(fs.readFileSync(componentPath, 'utf8'));
    return componentData;
  } catch (error) {
    throw new Error(`Failed to parse component metadata: ${error}`);
  }
}
