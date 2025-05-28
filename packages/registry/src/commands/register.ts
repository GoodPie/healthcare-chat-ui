import { Command } from 'commander';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { ComponentMetadata } from '../schemas';
import { defaultConfig, RegistryConfig } from "../types/config";
import { loadConfig } from "../utils/config";
import { validateComponentMetadata } from "../utils/validation";
import { FileWithContent, analyzeDependencies, DetectedDependencies } from "../tools/dependency-analyzer";

// Component file interface (extends FileWithContent with type)
interface ComponentFile extends FileWithContent {
  type: string;
}

// Helper function to check if file should be excluded
function shouldExcludeFile(fileName: string, excludePatterns: string[]): boolean {
  return excludePatterns.some(pattern => {
    const regex = new RegExp(pattern.replace(/\*/g, '.*'));
    return regex.test(fileName);
  });
}

// Use analyzeDependencies from dependency-analyzer.ts

// Helper function to register component locally
async function registerComponentLocally(
  componentData: ComponentMetadata,
  platform: 'react' | 'react-native',
  registryPath: string
): Promise<string> {
  // Create registry directory if it doesn't exist
  const absoluteRegistryPath = path.resolve(process.cwd(), registryPath);
  if (!fs.existsSync(absoluteRegistryPath)) {
    fs.mkdirSync(absoluteRegistryPath, { recursive: true });
  }

  // Create platform directory if it doesn't exist
  const componentDir = path.join(absoluteRegistryPath, componentData.name);
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
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

/**
 * Options for registering a component
 */
export interface RegisterComponentOptions {
  /**
   * Platform (react, react-native)
   */
  platform?: 'react' | 'react-native';

  /**
   * Override component name
   */
  name?: string;

  /**
   * Component description
   */
  description?: string;

  /**
   * Component dependencies
   * Can be a comma-separated string or an array of strings
   */
  dependencies?: string[] | string;

  /**
   * File type for registry
   */
  fileType?: string;

  /**
   * Register only to local registry (skip remote)
   */
  localOnly?: boolean;

  /**
   * Additional options
   */
  [key: string]: unknown;
}

// Main register function
export async function registerComponent(componentDir: string, options: RegisterComponentOptions = {}) {
  try {
    console.log(`Registering component from ${componentDir}...`);

    // Load configuration
    const config = loadConfig();

    // Override config with command line options
    const platform = options.platform || defaultConfig.framework || 'react';
    // Ensure file extensions have dots for consistency
    const fileExtensions = (config.fileExtensions || ['tsx', 'jsx', 'ts', 'js', 'css']).map(ext => 
      ext.startsWith('.') ? ext : `.${ext}`
    );
    const excludePatterns = config.excludePatterns || [];

    // Resolve the absolute path to the component directory
    const absoluteComponentDir = path.resolve(process.cwd(), componentDir);

    if (!fs.existsSync(absoluteComponentDir)) {
      throw new Error(`Directory "${componentDir}" not found.`);
    }

    // Read the metadata file if it exists
    const metadataPath = path.join(absoluteComponentDir, 'metadata.json');
    let metadata: Partial<ComponentMetadata> = {};

    if (fs.existsSync(metadataPath)) {
      try {
        metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
        console.log('📄 Found metadata.json file');
      } catch (error: unknown) {
        console.warn('Warning: Could not parse metadata.json file');
      }
    }

    // Read component.json as alternative metadata file
    const componentJsonPath = path.join(absoluteComponentDir, 'component.json');
    if (fs.existsSync(componentJsonPath)) {
      try {
        const componentJson = JSON.parse(fs.readFileSync(componentJsonPath, 'utf-8'));
        metadata = { ...metadata, ...componentJson };
        console.log('📄 Found component.json file');
      } catch (error: unknown) {
        console.warn('Warning: Could not parse component.json file');
      }
    }

    // Get all component files
    const allFiles = fs.readdirSync(absoluteComponentDir, { withFileTypes: true });
    const componentFiles: ComponentFile[] = [];

    for (const dirent of allFiles) {
      if (dirent.isFile()) {
        const fileName = dirent.name;

        // Skip excluded files
        if (shouldExcludeFile(fileName, excludePatterns)) {
          continue;
        }

        // Check file extension
        const hasValidExtension = fileExtensions.some(ext => fileName.endsWith(ext));
        if (!hasValidExtension) {
          continue;
        }

        const filePath = path.join(absoluteComponentDir, fileName);
        const content = fs.readFileSync(filePath, 'utf-8');

        componentFiles.push({
          name: fileName,
          content,
          type: options.fileType || 'registry:ui'
        });
      }
    }

    if (componentFiles.length === 0) {
      throw new Error(`No component files found with extensions: ${fileExtensions.join(', ')}`);
    }

    console.log(`📁 Found ${componentFiles.length} component files`);

    // Get component name from directory name if not specified
    const componentName = options.name || metadata.name || path.basename(absoluteComponentDir);

    // Auto-detect dependencies if enabled
    let detectedDeps: DetectedDependencies = { dependencies: [], devDependencies: [] };
    if (config.autoDetectDependencies) {
      detectedDeps = analyzeDependencies(componentFiles);
      console.log(`🔍 Auto-detected ${detectedDeps.dependencies.length} dependencies`);
    }

    // Prepare the component data
    const componentData: ComponentMetadata = {
      name: componentName,
      type: metadata.type || 'registry:ui',
      description: options.description || metadata.description || `${componentName} component`,
      dependencies: Array.isArray(options.dependencies) ? options.dependencies : 
                  (typeof options.dependencies === 'string' ? options.dependencies.split(',').map(dep => dep.trim()) : 
                  (metadata.dependencies || detectedDeps.dependencies)),
      devDependencies: metadata.devDependencies || detectedDeps.devDependencies,
      registryDependencies: metadata.registryDependencies || [],
      files: componentFiles.map(file => ({
        name: file.name,
        content: file.content,
        type: file.type
      })),
      version: metadata.version || '1.0.0',
      author: metadata.author,
      license: metadata.license,
      tags: metadata.tags || []
    };

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
      console.log(`✅ Registered ${componentName} component for ${platform}`);
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
    if (options.dependencies && typeof options.dependencies === 'string') {
      options.dependencies = options.dependencies.split(',').map((dep: string) => dep.trim());
    } else if (options.dependencies && Array.isArray(options.dependencies)) {
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
