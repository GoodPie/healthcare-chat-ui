import fs from 'fs-extra';
import path from 'path';
import { defaultConfig, type RegistryConfig } from '@healthcare-chat/core';

/**
 * Load configuration from config files or package.json
 */
export function loadConfig(): RegistryConfig {
  // Check for config files in the following order
  const configPaths = [
    path.join(process.cwd(), 'component-tools.config.json'),
    path.join(process.cwd(), '.component-tools.json'),
    // Support legacy config file names for backward compatibility
    path.join(process.cwd(), 'component-registry.config.json'),
    path.join(process.cwd(), '.component-registry.json')
  ];

  for (const configPath of configPaths) {
    if (fs.existsSync(configPath)) {
      try {
        const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        return { ...defaultConfig, ...configData };
      } catch (error) {
        console.warn(`Warning: Could not parse config file ${configPath}`);
      }
    }
  }

  // Check package.json for component tools config
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      
      // Check for componentTools config first, then fall back to componentRegistry for backward compatibility
      if (packageJson.componentTools) {
        return { ...defaultConfig, ...packageJson.componentTools };
      } else if (packageJson.componentRegistry) {
        console.warn('Warning: Using legacy "componentRegistry" config from package.json. Consider migrating to "componentTools".');
        return { ...defaultConfig, ...packageJson.componentRegistry };
      }
    } catch (error) {
      console.warn('Warning: Could not parse package.json');
    }
  }

  return defaultConfig;
}
