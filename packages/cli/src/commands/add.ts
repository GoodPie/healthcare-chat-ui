import {Command} from 'commander';
import fs from 'fs-extra';
import path from 'path';
import {fileURLToPath} from 'url';
import {
  type ComponentMetadata,
  fetchComponentFromUrl,
  loadComponentFromLocal,
  validateComponentMetadata
} from '@healthcare-chat/component-tools';
import {loadConfig} from '@/utils/config';

interface AddComponentOptions {
  targetDir?: string;
  framework?: 'react' | 'react-native';
  force?: boolean;

  [key: string]: unknown;
}

// Main add function
async function addComponent(componentName: string, options: AddComponentOptions = {}) {
  try {
    console.log(`Adding ${componentName} component to your project...`);

    // Load configuration
    const config = loadConfig();

    // Override config with command line options
    const targetDir = options.targetDir || config.targetDir || 'src/components/ui';
    const platform = options.framework || config.framework || 'react';

    let componentData: ComponentMetadata | undefined = undefined;

    // Determine how to fetch the component
    if (config.registryUrl) {
      // Fetch from remote registry
      componentData = await fetchComponentFromUrl(config.registryUrl, componentName, platform);
    } else if (config.registryPath) {
      // Load from local registry
      const resolvedRegistryPath = path.resolve(process.cwd(), config.registryPath);
      componentData = loadComponentFromLocal(resolvedRegistryPath, componentName, platform);
    } else {
      // Fallback: try to find registry in common locations
      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const commonRegistryPaths = [
        path.join(__dirname, '../../../registry/components'),
        path.join(process.cwd(), 'registry'),
        path.join(process.cwd(), 'components'),
        path.join(process.cwd(), 'src/registry')
      ];

      let found = false;
      for (const registryPath of commonRegistryPaths) {
        try {
          componentData = loadComponentFromLocal(registryPath, componentName, platform);
          found = true;
          break;
        } catch (error: unknown) {
          // Continue to next path
        }
      }

      if (!found) {
        throw new Error(
          `Component "${componentName}" not found. Please configure a registry URL or path in your config file.\n` +
          `Create a component-registry.config.json file with:\n` +
          `{\n` +
          `  "registryUrl": "https://your-registry.com/api/components",\n` +
          `  "registryPath": "./path/to/local/registry"\n` +
          `}`
        );
      }
    }

    if (!componentData) {
      throw new Error(`Component "${componentName}" not found in the registry.`);
    }

    // Validate component data
    componentData = validateComponentMetadata(componentData);

    // Resolve target directory
    const resolvedTargetDir = path.resolve(process.cwd(), targetDir);

    // Create the target directory if it doesn't exist
    if (!fs.existsSync(resolvedTargetDir)) {
      fs.mkdirSync(resolvedTargetDir, {recursive: true});
    }

    // Create a directory for the component
    const componentTargetDir = path.join(resolvedTargetDir, componentName);

    // Check if component already exists
    if (fs.existsSync(componentTargetDir)) {
      if (!options.force) {
        console.error(`Component "${componentName}" already exists at ${componentTargetDir}`);
        console.log('Use --force to overwrite existing component');
        process.exit(1);
      } else {
        console.log(`Overwriting existing component at ${componentTargetDir}`);
      }
    } else {
      fs.mkdirSync(componentTargetDir, {recursive: true});
    }

    // Copy each file from the component
    for (const file of componentData.files) {
      const filePath = path.join(componentTargetDir, file.name);

      // Create subdirectories if needed
      const fileDir = path.dirname(filePath);
      if (!fs.existsSync(fileDir)) {
        fs.mkdirSync(fileDir, {recursive: true});
      }

      fs.writeFileSync(filePath, file.content);
      console.log(`Created ${path.relative(process.cwd(), filePath)}`);
    }

    // Display dependency information if available
    if (componentData.dependencies && componentData.dependencies.length > 0) {
      console.log('\n📦 Dependencies required:');
      for (const dep of componentData.dependencies) {
        console.log(`  - ${dep}`);
      }
      console.log('\nInstall them with: npm install ' + componentData.dependencies.join(' '));
    }

    console.log(`\n✅ Added ${componentName} component to ${path.relative(process.cwd(), componentTargetDir)}`);
    console.log(`You can now import it from "${targetDir}/${componentName}"`);

  } catch (error: unknown) {
    console.error('Error adding component:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

// Define the add command
export const addCommand = new Command('add')
  .description('Add a component to your project')
  .argument('<component>', 'The component to add')
  .option('-t, --target-dir <dir>', 'Target directory for components')
  .option('-p, --platform <platform>', 'Platform (react, react-native) (default: \'react\')')
  .option('--force', 'Overwrite existing component')
  .action(addComponent);
