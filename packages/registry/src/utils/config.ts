import fs from 'fs-extra';
import path from 'path';
import {defaultConfig, RegistryConfig} from "@/types/config";

// Helper function to load config from package.json or config file
export function loadConfig(): RegistryConfig {
  const configPaths = [
    path.join(process.cwd(), 'component-registry.config.json'),
    path.join(process.cwd(), '.component-registry.json')
  ];

  for (const configPath of configPaths) {
    if (fs.existsSync(configPath)) {
      try {
        const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        return {...defaultConfig, ...configData};
      } catch (error) {
        console.warn(`Warning: Could not parse config file ${configPath}`);
      }
    }
  }

  // Check package.json for component registry config
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      if (packageJson.componentRegistry) {
        return {...defaultConfig, ...packageJson.componentRegistry};
      }
    } catch (error) {
      console.warn('Warning: Could not parse package.json');
    }
  }

  return defaultConfig;
}
