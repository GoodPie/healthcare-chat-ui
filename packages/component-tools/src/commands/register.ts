import { Command } from 'commander';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { loadConfig } from "../utils/config";
import { validateComponentMetadata } from "../utils/validation";
import { generateMetadata } from "../tools/metadata-generator";
import { RegisterComponentOptions } from "../types/register-component-options";
import { 
  ComponentMetadata, 
  defaultConfig, 
  BaseError,
  ValidationError, 
  ComponentError, 
  NetworkError,
  Logger,
  consoleLogger,
  tryCatch
} from '@healthcare-chat/core';

// Helper function to register component locally
async function registerComponentLocally(
  componentData: ComponentMetadata,
  platform: 'react' | 'react-native',
  registryPath: string,
  logger: Logger = consoleLogger
): Promise<string> {
  const result = await tryCatch(async () => {
    // Create registry directory if it doesn't exist
    const absoluteRegistryPath = path.resolve(process.cwd(), registryPath);
    if (!fs.existsSync(absoluteRegistryPath)) {
      try {
        fs.mkdirSync(absoluteRegistryPath, { recursive: true });
      } catch (error) {
        throw new ComponentError(
          `Failed to create registry directory: ${absoluteRegistryPath}`,
          { originalError: error }
        );
      }
    }

    // Create component directory if it doesn't exist
    const componentDir = path.join(absoluteRegistryPath, componentData.name);
    if (!fs.existsSync(componentDir)) {
      try {
        fs.mkdirSync(componentDir, { recursive: true });
      } catch (error) {
        throw new ComponentError(
          `Failed to create component directory: ${componentDir}`,
          { originalError: error }
        );
      }
    }

    // Write the component metadata
    const componentFilePath = path.join(componentDir, `${platform}.json`);
    try {
      fs.writeFileSync(componentFilePath, JSON.stringify(componentData, null, 2));
    } catch (error) {
      throw new ComponentError(
        `Failed to write component metadata to: ${componentFilePath}`,
        { originalError: error }
      );
    }

    return componentFilePath;
  });

  if (result.isFailure) {
    const error = result.error;
    if (error instanceof ComponentError) {
      throw error;
    } else {
      throw new ComponentError(
        `Failed to register component locally: ${error.message}`,
        { originalError: error }
      );
    }
  }

  logger.debug(`Component registered locally at: ${result.value}`);
  return result.value;
}

// Helper function to register component remotely
async function registerComponentRemotely(
  componentData: ComponentMetadata,
  platform: 'react' | 'react-native',
  registryUrl: string,
  logger: Logger = consoleLogger
): Promise<void> {
  const url = `${registryUrl}/${platform}/${componentData.name}`;

  const result = await tryCatch(async () => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(componentData)
    });

    if (!response.ok) {
      throw new NetworkError(
        `HTTP ${response.status}: ${response.statusText}`,
        { status: response.status, statusText: response.statusText }
      );
    }

    return response;
  });

  if (result.isFailure) {
    const error = result.error;
    if (error instanceof NetworkError) {
      throw error;
    } else {
      throw new NetworkError(
        `Failed to register to remote registry: ${error.message}`,
        { originalError: error }
      );
    }
  }

  logger.info(`✅ Successfully registered ${componentData.name} to remote registry`);
}

// Main register function
export async function registerComponent(
  componentDir: string, 
  options: RegisterComponentOptions = {},
  logger: Logger = consoleLogger
) {
  logger.info(`Registering component from ${componentDir}...`);

  // Load configuration
  const config = loadConfig();

  // Override config with command line options
  const platform = options.framework || defaultConfig.framework || 'react';
  // Ensure file extensions have dots for consistency
  const fileExtensions = (config.fileExtensions || ['tsx', 'jsx', 'ts', 'js', 'css']).map(ext =>
    ext.startsWith('.') ? ext : `.${ext}`
  );
  const excludePatterns = config.excludePatterns || [];

  // Generate metadata
  const metadataResult = await tryCatch(async () => {
    return await generateMetadata({
      componentDir,
      name: options.name,
      description: options.description,
      type: options.fileType || 'registry:ui',
      platform,
      fileExtensions,
      excludePatterns,
      autoDetectDependencies: config.autoDetectDependencies || true
    });
  });

  if (metadataResult.isFailure) {
    const error = metadataResult.error;
    logger.error('Failed to generate component metadata', error);
    throw new ComponentError(
      `Failed to generate metadata for component: ${error.message}`,
      { originalError: error }
    );
  }

  const componentData = metadataResult.value;

  // Validate the component data
  const validationResult = validateComponentMetadata(componentData);

  if (validationResult.isFailure) {
    const error = validationResult.error;
    logger.error('Component metadata validation failed', error);
    throw error;
  }

  const validatedComponentData = validationResult.value;

  try {
    // Register the component
    if (config.registryUrl && !options.localOnly) {
      // Register to remote registry
      await registerComponentRemotely(validatedComponentData, platform, config.registryUrl, logger);
      logger.info(`✅ Registered ${validatedComponentData.name} component to remote registry`);
    } else {
      // Register locally
      const registryPath = config.registryPath || './registry';
      const componentFilePath = await registerComponentLocally(validatedComponentData, platform, registryPath, logger);
      logger.info(`✅ Registered ${validatedComponentData.name} component for ${platform}`);
      logger.info(`📁 Saved to: ${path.relative(process.cwd(), componentFilePath)}`);
    }

    // Display summary
    logger.info('\n📊 Component Summary:');
    logger.info(`   Name: ${validatedComponentData.name}`);
    logger.info(`   Platform: ${platform}`);
    logger.info(`   Files: ${validatedComponentData.files.length}`);
    logger.info(`   Dependencies: ${validatedComponentData.dependencies?.length || 0}`);
    if (validatedComponentData.description) {
      logger.info(`   Description: ${validatedComponentData.description}`);
    }

    return validatedComponentData;
  } catch (error: unknown) {
    if (error instanceof BaseError) {
      logger.error(`Error registering component: ${error.message}`, error);
      throw error;
    } else {
      const errorMessage = error instanceof Error ? error.message : String(error);
      logger.error('Error registering component', error);
      throw new ComponentError(`Failed to register component: ${errorMessage}`, { originalError: error });
    }
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
    const logger = consoleLogger;

    // Parse dependencies if provided
    if (options.dependencies && Array.isArray(options.dependencies)) {
      options.dependencies = options.dependencies.map((dep: string) => dep.trim());
    }

    try {
      await registerComponent(componentDir, options, logger);
    } catch (error: unknown) {
      if (error instanceof BaseError) {
        logger.error(`Error registering component: ${error.message}`, error);
      } else {
        const errorMessage = error instanceof Error ? error.message : String(error);
        logger.error('Error registering component:', errorMessage);
      }
      process.exit(1);
    }
  });
