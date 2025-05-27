import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { ComponentMetadataSchema, REGISTRY_PATH, getComponentPath } from '@healthcare-chat/registry';

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Define the add command
export const addCommand = new Command('add')
  .description('Add a component to your project')
  .argument('<component>', 'The component to add')
  .action(async (componentName: string) => {
    try {
      console.log(`Adding ${componentName} component to your project...`);

      // Define paths
      const registryBasePath = path.resolve(__dirname, '../../../registry');
      const targetDir = path.resolve(process.cwd(), 'src/components/ui');

      // Get the component path using the registry helper function
      const componentRelativePath = getComponentPath(componentName, 'react');
      const componentJsonPath = path.join(registryBasePath, componentRelativePath);

      // Check if the component exists in the registry
      if (!fs.existsSync(componentJsonPath)) {
        console.error(`Component "${componentName}" not found in the registry.`);
        process.exit(1);
      }

      // Read the component metadata
      const componentDataRaw = fs.readJsonSync(componentJsonPath);

      // Validate the component data using the schema
      const parseResult = ComponentMetadataSchema.safeParse(componentDataRaw);
      if (!parseResult.success) {
        console.error(`Invalid component metadata for "${componentName}":`, parseResult.error);
        process.exit(1);
      }

      const componentData = parseResult.data;

      // Create the target directory if it doesn't exist
      if (!fs.existsSync(targetDir)) {
        fs.mkdirpSync(targetDir);
      }

      // Create a directory for the component
      const componentTargetDir = path.join(targetDir, componentName);
      fs.mkdirpSync(componentTargetDir);

      // Copy each file from the component
      for (const file of componentData.files) {
        const filePath = path.join(componentTargetDir, file.name);
        fs.writeFileSync(filePath, file.content);
        console.log(`Created ${filePath}`);
      }

      console.log(`✅ Added ${componentName} component to src/components/ui/${componentName}`);
      console.log(`You can now import it from "src/components/ui/${componentName}"`);

    } catch (error) {
      console.error('Error adding component:', error);
      process.exit(1);
    }
  });
