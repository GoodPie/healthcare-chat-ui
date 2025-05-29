import { Command } from 'commander';
import {createComponent} from "@/tools/component-creator";

/**
 * Command to create a new component
 */
export const createComponentCommand = new Command('create-component')
  .description('Create a new component')
  .argument('<name>', 'Component name (PascalCase)')
  .option('-o, --output-dir <dir>', 'Output directory', './src/components')
  .option('-d, --description <description>', 'Component description')
  .option('-p, --platform <platform>', 'Platform (react, react-native)', 'react')
  .option('-t, --type <type>', 'Component type', 'registry:ui')
  .option('--no-typescript', 'Use JavaScript instead of TypeScript')
  .option('--no-css', 'Skip CSS file creation')
  .option('--tests', 'Create test files')
  .option('--stories', 'Create story files')
  .action(async (name: string, options: {
    outputDir?: string;
    description?: string;
    platform?: 'react' | 'react-native';
    type?: string;
    typescript?: boolean;
    css?: boolean;
    tests?: boolean;
    stories?: boolean;
  }) => {
    try {
      const componentDir = await createComponent({
        name,
        outputDir: options.outputDir,
        description: options.description || `${name} component`,
        type: options.type,
        platform: options.platform,
        typescript: options.typescript !== false,
        css: options.css !== false,
        tests: options.tests || false,
        stories: options.stories || false
      });

      console.log(`\n✅ Component created successfully at ${componentDir}`);
      console.log('\nNext steps:');
      console.log('1. Implement your component logic');
      console.log('2. Register your component with: healthcare-chat-tools register ' + componentDir);
    } catch (error) {
      console.error('Error creating component:', error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });
