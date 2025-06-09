import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import {defaultConfig, RegistryConfig} from "@healthcare-chat/component-tools";

const copyStyles = (targetDir: string) => {
  try {
    // Navigate from packages/cli to packages/design-tokens/index.css
    const stylesSource = path.join(__dirname, '../../design-tokens/dist/index.css');
    const stylesTarget = path.join(targetDir, 'styles', 'index.css');

    // Check if source file exists
    if (!fs.existsSync(stylesSource)) {
      console.warn(`⚠️  Warning: Could not find styles at ${stylesSource}`);
      return false;
    }

    // Ensure the target directory exists
    fs.ensureDirSync(path.dirname(stylesTarget));

    // Copy the index.css file
    fs.copySync(stylesSource, stylesTarget);
    console.log(`✅ Copied design tokens to ${stylesTarget}`);
    return true;
  } catch (error: unknown) {
    console.error('Error copying styles:', error instanceof Error ? error.message : error);
    return false;
  }
}

interface InitOptions {
  registryUrl?: string;
  registryPath?: string;
  targetDir?: string;
  framework?: 'react' | 'react-native';
  force?: boolean;
  [key: string]: unknown;
}

// Main init function
async function initializeConfig(options: InitOptions = {}) {
  try {
    console.log('Initializing Healthcare Chat UI configuration...');

    // Prepare configuration with defaults and overrides
    const config: RegistryConfig = {
      ...defaultConfig,
      ...(options.registryUrl ? { registryUrl: options.registryUrl } : {}),
      ...(options.registryPath ? { registryPath: options.registryPath } : {}),
      ...(options.targetDir ? { targetDir: options.targetDir } : {}),
      ...(options.platform ? { platform: options.platform } : {})
    };

    // Determine the config file path
    const configFilePath = path.join(process.cwd(), 'component-registry.config.json');

    // Check if config file already exists
    if (fs.existsSync(configFilePath) && !options.force) {
      console.error('Configuration file already exists at', configFilePath);
      console.log('Use --force to overwrite existing configuration');
      process.exit(1);
    }

    // Write the configuration file
    fs.writeFileSync(
      configFilePath,
      JSON.stringify(config, null, 2),
      'utf8'
    );

    console.log(`✅ Created configuration file at ${configFilePath}`);

    // Copy design tokens/styles
    const targetDir = path.resolve(process.cwd(), config.targetDir || 'src/components/ui');
    const stylesCopied = copyStyles(targetDir);

    if (stylesCopied) {
      console.log('💡 Import the styles in your main CSS file:');
      console.log(`   @import './styles/index.css';`);
    }

    console.log('You can now use the Healthcare Chat UI CLI to add components to your project.');
    console.log('Try running: healthcare-chat-ui add message-bubble');

  } catch (error: unknown) {
    console.error('Error initializing configuration:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

// Define the init command
export const initCommand = new Command('init')
  .description('Initialize Healthcare Chat UI configuration in your project')
  .option('-u, --registry-url <url>', 'URL to a remote component registry')
  .option('-r, --registry-path <path>', 'Path to a local component registry')
  .option('-t, --target-dir <dir>', `Target directory for components (default: "${defaultConfig.targetDir}")`)
  .option('-p, --platform <platform>', `Platform to use (react, react-native) (default: "${defaultConfig.framework}")`)
  .option('--force', 'Overwrite existing configuration if it exists')
  .action(initializeConfig);
