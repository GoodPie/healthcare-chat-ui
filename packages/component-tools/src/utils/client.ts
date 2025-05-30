import fs from 'fs-extra';
import path from 'path';
import { validateComponentMetadata } from './validation';
import { ComponentMetadata } from '@healthcare-chat/core';

/**
 * Fetches component metadata from a remote registry URL
 * @param url The base URL of the registry
 * @param componentName The name of the component to fetch
 * @param framework The framework of the component (react, react-native)
 * @returns The validated component metadata
 */
export async function fetchComponentFromUrl(
  url: string,
  componentName: string,
  framework: 'react' | 'react-native'
): Promise<ComponentMetadata> {
  const fullUrl = `${url}/${framework}/${componentName}/${framework}.json`;
  
  try {
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

/**
 * Loads component metadata from a local registry path
 * @param registryPath The path to the local registry
 * @param componentName The name of the component to load
 * @param framework The framework of the component (react, react-native)
 * @returns The validated component metadata
 */
export function loadComponentFromLocal(
  registryPath: string,
  componentName: string,
  framework: 'react' | 'react-native'
): ComponentMetadata {
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
