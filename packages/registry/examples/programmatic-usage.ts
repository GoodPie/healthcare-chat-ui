/**
 * Example demonstrating how to use the registry package programmatically
 */

import {
  createComponent,
  generateMetadata,
  validateComponentMetadata,
  registerComponentFromDir as registerComponent,
  analyzeDependencies,
  type CreateComponentOptions,
  type ComponentMetadata
} from '@healthcare-chat/registry';

/**
 * Example: Create a new component
 */
async function createExampleComponent() {
  console.log('Creating a new component programmatically...');

  const options: CreateComponentOptions = {
    name: 'ProgrammaticButton',
    outputDir: './examples/components',
    description: 'A button created programmatically',
    typescript: true,
    css: true,
    tests: true,
    stories: true
  };

  try {
    const componentDir = await createComponent(options);
    console.log(`Component created at: ${componentDir}`);
    return componentDir;
  } catch (error: unknown) {
    console.error('Error creating component:', error instanceof Error ? error.message : error);
    throw error;
  }
}

/**
 * Example: Generate metadata for a component
 */
async function generateExampleMetadata(componentDir: string) {
  console.log('Generating metadata for the component...');

  try {
    const metadata = await generateMetadata({
      componentDir,
      autoDetectDependencies: true
    });

    console.log('Generated metadata:', JSON.stringify(metadata, null, 2));
    return metadata;
  } catch (error: unknown) {
    console.error('Error generating metadata:', error instanceof Error ? error.message : error);
    throw error;
  }
}

/**
 * Example: Validate component metadata
 */
function validateExampleMetadata(metadata: ComponentMetadata) {
  console.log('Validating component metadata...');

  try {
    const validatedMetadata = validateComponentMetadata(metadata);
    console.log('Metadata is valid!');
    return validatedMetadata;
  } catch (error: unknown) {
    console.error('Metadata validation failed:', error instanceof Error ? error.message : error);
    throw error;
  }
}

/**
 * Example: Register a component
 */
async function registerExampleComponent(componentDir: string) {
  console.log('Registering the component...');

  try {
    const result = await registerComponent(componentDir, {
      platform: 'react',
      description: 'A component registered programmatically',
      localOnly: true
    });

    console.log('Component registered successfully:', result.name);
    return result;
  } catch (error: unknown) {
    console.error('Error registering component:', error instanceof Error ? error.message : error);
    throw error;
  }
}

/**
 * Example: Analyze dependencies in component files
 */
function analyzeExampleDependencies(metadata: ComponentMetadata) {
  console.log('Analyzing component dependencies...');

  try {
    const dependencies = analyzeDependencies(metadata.files);
    console.log('Detected dependencies:', dependencies);
    return dependencies;
  } catch (error: unknown) {
    console.error('Error analyzing dependencies:', error instanceof Error ? error.message : error);
    throw error;
  }
}

/**
 * Run the complete example workflow
 */
async function runExample() {
  try {
    // Step 1: Create a component
    const componentDir = await createExampleComponent();

    // Step 2: Generate metadata
    const metadata = await generateExampleMetadata(componentDir);

    // Step 3: Validate metadata
    const validatedMetadata = validateExampleMetadata(metadata);

    // Step 4: Analyze dependencies
    const dependencies = analyzeExampleDependencies(validatedMetadata);

    // Step 5: Register the component
    const registeredComponent = await registerExampleComponent(componentDir);

    console.log('\nWorkflow complete! Component has been created, validated, and registered.');
  } catch (error: unknown) {
    console.error('Example workflow failed:', error instanceof Error ? error.message : error);
  }
}

// Run the example if this file is executed directly
if (require.main === module) {
  runExample();
}

// Export the functions for use in other examples
export {
  createExampleComponent,
  generateExampleMetadata,
  validateExampleMetadata,
  registerExampleComponent,
  analyzeExampleDependencies,
  runExample
};
