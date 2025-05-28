import { Command } from 'commander';
import { registerComponentFromDir, RegisterComponentOptions } from '@healthcare-chat/registry';

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
    if (options.dependencies) {
      options.dependencies = options.dependencies.map((dep: string) => dep.trim());
    }

    try {
      await registerComponentFromDir(componentDir, options);
    } catch (error: unknown) {
      console.error('Error registering component:', error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });
