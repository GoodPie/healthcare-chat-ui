import { Command } from 'commander';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { generateMetadata } from '../tools/metadata-generator';
import { validateComponentMetadata } from '../utils/validation';
import { 
  BaseError, 
  ValidationError, 
  ComponentError, 
  Logger, 
  consoleLogger, 
  tryCatch 
} from '@healthcare-chat/core';

/**
 * Command to validate a component
 */
export const validateCommand = new Command('validate')
  .description('Validate a component')
  .argument('<component-dir>', 'Directory containing the component to validate')
  .option('-p, --platform <platform>', 'Platform (react, react-native)', 'react')
  .option('-n, --name <name>', 'Override component name')
  .option('-d, --description <description>', 'Component description')
  .action(async (componentDir: string, options: {
    platform?: 'react' | 'react-native';
    name?: string;
    description?: string;
  }) => {
    const logger = consoleLogger;

    try {
      logger.info(`Validating component in ${componentDir}...`);

      // Resolve the absolute path to the component directory
      const absoluteComponentDir = path.resolve(process.cwd(), componentDir);
      if (!fs.existsSync(absoluteComponentDir)) {
        throw new ComponentError(`Directory "${componentDir}" not found.`);
      }

      // Generate metadata
      const metadataResult = await tryCatch(async () => {
        return await generateMetadata({
          componentDir,
          name: options.name,
          description: options.description,
          platform: options.platform
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

      const metadata = metadataResult.value;

      // Validate the component data
      const validationResult = validateComponentMetadata(metadata);

      if (validationResult.isFailure) {
        const error = validationResult.error;
        logger.error('Component metadata validation failed', error);
        throw error;
      }

      const validatedMetadata = validationResult.value;

      logger.info('\n✅ Component validation successful!');
      logger.info('\n📊 Component Summary:');
      logger.info(`   Name: ${validatedMetadata.name}`);
      logger.info(`   Platform: ${options.platform}`);
      logger.info(`   Files: ${validatedMetadata.files.length}`);
      logger.info(`   Dependencies: ${validatedMetadata.dependencies?.length || 0}`);
      if (validatedMetadata.description) {
        logger.info(`   Description: ${validatedMetadata.description}`);
      }

      // Check for potential issues
      const warnings = [];

      // Check if component has a description
      if (!validatedMetadata.description || validatedMetadata.description === `${validatedMetadata.name} component`) {
        warnings.push('Component has a generic description. Consider adding a more descriptive one.');
      }

      // Check if component has files
      if (validatedMetadata.files.length === 0) {
        warnings.push('Component has no files.');
      }

      // Check if component has a CSS file
      const hasCssFile = validatedMetadata.files.some(file => file.name.endsWith('.css'));
      if (!hasCssFile) {
        warnings.push('Component has no CSS file. Consider adding one for styling.');
      }

      // Check if component has a types file
      const hasTypesFile = validatedMetadata.files.some(file => file.name === 'types.ts');
      if (!hasTypesFile) {
        warnings.push('Component has no types file. Consider adding one for better type safety.');
      }

      // Display warnings if any
      if (warnings.length > 0) {
        logger.warn('\n⚠️ Warnings:');
        warnings.forEach(warning => {
          logger.warn(`   - ${warning}`);
        });
      }
    } catch (error) {
      if (error instanceof BaseError) {
        logger.error(`Error validating component: ${error.message}`, error);
      } else {
        const errorMessage = error instanceof Error ? error.message : String(error);
        logger.error('Error validating component:', errorMessage);
      }
      process.exit(1);
    }
  });
