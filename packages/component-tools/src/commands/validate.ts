import { Command } from 'commander';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { generateMetadata } from '../tools/metadata-generator';

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
    try {
      console.log(`Validating component in ${componentDir}...`);
      
      // Resolve the absolute path to the component directory
      const absoluteComponentDir = path.resolve(process.cwd(), componentDir);
      if (!fs.existsSync(absoluteComponentDir)) {
        throw new Error(`Directory "${componentDir}" not found.`);
      }
      
      // Generate metadata
      const metadata = await generateMetadata({
        componentDir,
        name: options.name,
        description: options.description,
        platform: options.platform
      });
      
      console.log('\n✅ Component validation successful!');
      console.log('\n📊 Component Summary:');
      console.log(`   Name: ${metadata.name}`);
      console.log(`   Platform: ${options.platform}`);
      console.log(`   Files: ${metadata.files.length}`);
      console.log(`   Dependencies: ${metadata.dependencies?.length || 0}`);
      if (metadata.description) {
        console.log(`   Description: ${metadata.description}`);
      }
      
      // Check for potential issues
      const warnings = [];
      
      // Check if component has a description
      if (!metadata.description || metadata.description === `${metadata.name} component`) {
        warnings.push('Component has a generic description. Consider adding a more descriptive one.');
      }
      
      // Check if component has files
      if (metadata.files.length === 0) {
        warnings.push('Component has no files.');
      }
      
      // Check if component has a CSS file
      const hasCssFile = metadata.files.some(file => file.name.endsWith('.css'));
      if (!hasCssFile) {
        warnings.push('Component has no CSS file. Consider adding one for styling.');
      }
      
      // Check if component has a types file
      const hasTypesFile = metadata.files.some(file => file.name === 'types.ts');
      if (!hasTypesFile) {
        warnings.push('Component has no types file. Consider adding one for better type safety.');
      }
      
      // Display warnings if any
      if (warnings.length > 0) {
        console.log('\n⚠️ Warnings:');
        warnings.forEach(warning => {
          console.log(`   - ${warning}`);
        });
      }
    } catch (error) {
      console.error('Error validating component:', error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });
