import { Command } from 'commander';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { ComponentMetadata, ComponentMetadataSchema } from '@healthcare-chat/registry';
import {defaultConfig, RegistryConfig} from "@/types/config";

// Component file interface
interface ComponentFile {
  name: string;
  content: string;
  type?: string;
}

// Helper function to load config
function loadConfig(): RegistryConfig {
  const configPaths = [
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

  // Check package.json for component registry config
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      if (packageJson.componentRegistry) {
        return { ...defaultConfig, ...packageJson.componentRegistry };
      }
    } catch (error) {
      console.warn('Warning: Could not parse package.json');
    }
  }

  return defaultConfig;
}

// Helper function to check if file should be excluded
function shouldExcludeFile(fileName: string, excludePatterns: string[]): boolean {
  return excludePatterns.some(pattern => {
    const regex = new RegExp(pattern.replace(/\*/g, '.*'));
    return regex.test(fileName);
  });
}

// Helper function to detect dependencies from file content
function detectDependencies(files: ComponentFile[]): { dependencies: string[], devDependencies: string[] } {
  const dependencies = new Set<string>();
  const devDependencies = new Set<string>();

  for (const file of files) {
    const content = file.content;

    // Match import statements
    const importMatches = content.matchAll(/^import.*from\s+['"]([^'"]+)['"]/gm);
    for (const match of importMatches) {
      const packageName = match[1];

      // Skip relative imports
      if (packageName.startsWith('.') || packageName.startsWith('/')) {
        continue;
      }

      // Extract package name (handle scoped packages)
      const parts = packageName.split('/');
      const actualPackageName = packageName.startsWith('@') 
        ? `${parts[0]}/${parts[1]}` 
        : parts[0];

      // Common dev dependencies patterns
      if (actualPackageName.includes('test') || 
          actualPackageName.includes('story') || 
          actualPackageName.includes('mock')) {
        devDependencies.add(actualPackageName);
      } else {
        dependencies.add(actualPackageName);
      }
    }

    // Match require statements
    const requireMatches = content.matchAll(/require\(['"]([^'"]+)['"]\)/gm);
    for (const match of requireMatches) {
      const packageName = match[1];
      if (!packageName.startsWith('.') && !packageName.startsWith('/')) {
        const parts = packageName.split('/');
        const actualPackageName = packageName.startsWith('@') 
          ? `${parts[0]}/${parts[1]}` 
          : parts[0];
        dependencies.add(actualPackageName);
      }
    }
  }

  return {
    dependencies: Array.from(dependencies),
    devDependencies: Array.from(devDependencies)
  };
}

// Helper function to validate component metadata
function validateComponentMetadata(data: any): void {
  const parseResult = ComponentMetadataSchema.safeParse(data);
  if (!parseResult.success) {
    throw new Error(`Invalid component metadata: ${parseResult.error.message}`);
  }
}

// Helper function to register component locally
async function registerComponentLocally(
  componentData: ComponentMetadata,
  platform: string,
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
  platform: string,
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
  } catch (error) {
    throw new Error(`Failed to register to remote registry: ${error}`);
  }
}

// Main register function
async function registerComponent(componentDir: string, options: any = {}) {
  try {
    console.log(`Registering component from ${componentDir}...`);

    // Load configuration
    const config = loadConfig();

    // Override config with command line options
    const platform = options.platform || defaultConfig.framework || 'react';
    const fileExtensions = config.fileExtensions || ['.tsx', '.ts', '.jsx', '.js'];
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
      } catch (error) {
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
      } catch (error) {
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
    let detectedDeps = { dependencies: [], devDependencies: [] };
    if (config.autoDetectDependencies) {
      detectedDeps = detectDependencies(componentFiles);
      console.log(`🔍 Auto-detected ${detectedDeps.dependencies.length} dependencies`);
    }

    // Prepare the component data
    const componentData: ComponentMetadata = {
      name: componentName,
      type: metadata.type || 'registry:ui',
      description: options.description || metadata.description || `${componentName} component`,
      dependencies: options.dependencies || metadata.dependencies || detectedDeps.dependencies,
      devDependencies: metadata.devDependencies || detectedDeps.devDependencies,
      registryDependencies: metadata.registryDependencies || [],
      files: componentFiles,
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

  } catch (error) {
    console.error('Error registering component:', error instanceof Error ? error.message : error);
    process.exit(1);
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
  .action(async (componentDir: string, options: any) => {
    // Parse dependencies if provided
    if (options.dependencies) {
      options.dependencies = options.dependencies.split(',').map((dep: string) => dep.trim());
    }

    await registerComponent(componentDir, options);
  });
