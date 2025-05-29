import {Command} from 'commander';
import * as fs from 'node:fs';
import * as path from 'node:path';
import {loadConfig} from "@/utils/config";
import {validateComponentMetadata} from "@/utils/validation";
import {generateMetadata} from "@healthcare-chat/tools";
import {RegisterComponentOptions} from "@/types/register-component-options";
import {ComponentMetadata, defaultConfig} from '@healthcare-chat/core';


// Helper function to register component locally
async function registerComponentLocally(
  componentData: ComponentMetadata,
  platform: 'react' | 'react-native',
  registryPath: string
): Promise<string> {

  // Create registry directory if it doesn't exist
  const absoluteRegistryPath = path.resolve(process.cwd(), registryPath);
  if (!fs.existsSync(absoluteRegistryPath)) {
    fs.mkdirSync(absoluteRegistryPath, {recursive: true});
  }

  // Create platform directory if it doesn't exist
  const componentDir = path.join(absoluteRegistryPath, componentData.name);
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, {recursive: true});
  }

  // Write the component metadata
  const componentFilePath = path.join(componentDir, `${platform}.json`);
  fs.writeFileSync(componentFilePath, JSON.stringify(componentData, null, 2));

  return componentFilePath;
}

// Helper function to register component remotely
async function registerComponentRemotely(
  componentData: ComponentMetadata,
  platform: 'react' | 'react-native',
  registryUrl: string
): Promise<void> {
  const url = `${registryUrl}/${platform}/${componentData.name}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(componentData)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    console.log(`✅ Successfully registered ${componentData.name} to remote registry`);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to register to remote registry: ${errorMessage}`);
  }
}

// Main register function
export async function registerComponent(componentDir: string, options: RegisterComponentOptions = {}) {
  try {
    console.log(`Registering component from ${componentDir}...`);

    // Load configuration
    const config = loadConfig();

    // Override config with command line options
    const platform = options.framework || defaultConfig.framework || 'react';
    // Ensure file extensions have dots for consistency
    const fileExtensions = (config.fileExtensions || ['tsx', 'jsx', 'ts', 'js', 'css']).map(ext =>
      ext.startsWith('.') ? ext : `.${ext}`
    );
    const excludePatterns = config.excludePatterns || [];

    // Resolve the absolute path to the component directory
    const componentData = await generateMetadata({
      componentDir,
      name: options.name,
      description: options.description,
      type: options.fileType || 'registry:ui',
      platform,
      fileExtensions,
      excludePatterns,
      autoDetectDependencies: config.autoDetectDependencies || true
    })

    // Validate the component data
    validateComponentMetadata(componentData);

    // Register the component
    if (config.registryUrl && !options.localOnly) {
      // Register to remote registry
      await registerComponentRemotely(componentData, platform, config.registryUrl);
    } else {
      // Register locally
      const registryPath = config.registryPath || './registry';
      const componentFilePath = await registerComponentLocally(componentData, platform, registryPath);
      console.log(`✅ Registered ${componentData.name} component for ${platform}`);
      console.log(`📁 Saved to: ${path.relative(process.cwd(), componentFilePath)}`);
    }

    // Display summary
    console.log('\n📊 Component Summary:');
    console.log(`   Name: ${componentData.name}`);
    console.log(`   Platform: ${platform}`);
    console.log(`   Files: ${componentData.files.length}`);
    console.log(`   Dependencies: ${componentData.dependencies?.length || 0}`);
    if (componentData.description) {
      console.log(`   Description: ${componentData.description}`);
    }

    return componentData;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error registering component:', errorMessage);
    throw error;
  }
}

// Define the register command
export const registerCommand = new Command('register')
  .description('Register a component in the registry')
  .argument('<component-dir>', 'Directory containing the component to register')
  .option('-p, --platform <platform>', 'Platform (react, vue, svelte, react-native)')
  .option('-n, --name <name>', 'Override component name')
  .option('-d, --description <description>', 'Component description')
  .option('--dependencies <deps>', 'Comma-separated list of dependencies')
  .option('--file-type <type>', 'File type for registry', 'registry:ui')
  .option('--local-only', 'Register only to local registry (skip remote)')
  .action(async (componentDir: string, options: RegisterComponentOptions) => {
    // Parse dependencies if provided
    if (options.dependencies && Array.isArray(options.dependencies)) {
      options.dependencies = options.dependencies.map((dep: string) => dep.trim());
    }

    try {
      await registerComponent(componentDir, options);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('Error registering component:', errorMessage);
      process.exit(1);
    }
  });
