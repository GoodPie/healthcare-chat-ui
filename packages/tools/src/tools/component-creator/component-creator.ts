#!/usr/bin/env node

import * as nodeFs from 'node:fs';
import * as nodePath from 'node:path';
import {ComponentMetadata, consoleLogger, toKebabCase, validatePascalCase} from '@healthcare-chat/core';
import {defaultFileContentGenerator} from "src/tools/component-creator";

/**
 * Options for creating a new component
 */
interface CreateComponentOptions {
  /**
   * Component name (PascalCase)
   */
  name: string;

  /**
   * Output directory
   */
  outputDir?: string;

  /**
   * Component description
   */
  description?: string;

  /**
   * Component type
   */
  type?: string;

  /**
   * Component framework
   */
  framework?: 'react' | 'react-native';

  /**
   * Whether to create TypeScript files
   */
  typescript?: boolean;

  /**
   * Whether to create CSS files
   */
  css?: boolean;

  /**
   * Whether to create test files
   */
  tests?: boolean;

  /**
   * Whether to create story files
   */
  stories?: boolean;
}

/**
 * Result of component creation
 */
interface ComponentCreationResult {
  /**
   * Absolute path to the component directory
   */
  componentDir: string;

  /**
   * Map of file paths to their contents
   */
  files: Record<string, string>;
}

/**
 * Create a new component
 */
export async function createComponent(
  options: CreateComponentOptions,
  fileContentGenerator = defaultFileContentGenerator,
  fs = nodeFs,
  path = nodePath,
  workingDir = process.cwd(),
  logger = consoleLogger,
  {dryRun = false}: { dryRun?: boolean } = {}
): Promise<ComponentCreationResult> {
  const {
    name,
    outputDir = './src/components',
    description = `${name} component`,
    type = 'registry:ui',
    css = true,
    tests = false,
    stories = false
  } = options;

  logger.log(`🔧 Working in: ${workingDir}`);

  // Validate component name
  validatePascalCase(name, "Component name must be in PascalCase");

  // Create the kebab-case version of the name
  const kebabName = toKebabCase(name);

  // Create the component directory relative to the current working directory
  const componentDir = path.join(outputDir, kebabName);
  const absoluteComponentDir = path.resolve(workingDir, componentDir);

  // Check if the component directory already exists
  // Fail as we don't want to overwrite existing components when generating
  if (fs.existsSync(absoluteComponentDir)) {
    throw new Error(`Component directory already exists: ${componentDir}`);
  }

  // Create the files to map to store file contents
  const files: Record<string, string> = {};

  // Create the component directory if not in dry run mode
  if (!dryRun) {
    fs.mkdirSync(absoluteComponentDir, {recursive: true});
    logger.log(`✅ Created component directory: ${componentDir}`);
  }

  // Create component files
  const fileExtension = 'tsx';
  const styleExtension = 'css';
  const typeExtension = 'ts';

  // Create the component file
  const componentContent = fileContentGenerator.createComponentContent(name, {css});
  const componentFilePath = path.join(absoluteComponentDir, `${kebabName}.${fileExtension}`);
  const relativeComponentFilePath = path.join(componentDir, `${kebabName}.${fileExtension}`);
  files[relativeComponentFilePath] = componentContent;

  if (!dryRun) {
    fs.writeFileSync(componentFilePath, componentContent);
    logger.log(`✅ Created component file: ${path.relative(workingDir, componentFilePath)}`);
  }

  // Create index file for easier imports
  // TODO: Will review this later. I like index files but I know opinions are divided on this.
  const indexContent = `export { ${name} } from './${kebabName}';\n`;
  const indexFilePath = path.join(absoluteComponentDir, `index.ts`);
  const relativeIndexFilePath = path.join(componentDir, `index.ts`);
  files[relativeIndexFilePath] = indexContent;

  if (!dryRun) {
    fs.writeFileSync(indexFilePath, indexContent);
    logger.log(`✅ Created index file: ${path.relative(workingDir, indexFilePath)}`);
  }

  const typesContent = fileContentGenerator.createTypesContent(name);
  const typesFilePath = path.join(absoluteComponentDir, `types.${typeExtension}`);
  const relativeTypesFilePath = path.join(componentDir, `types.${typeExtension}`);
  files[relativeTypesFilePath] = typesContent;

  if (!dryRun) {
    fs.writeFileSync(typesFilePath, typesContent);
    logger.log(`✅ Created types file: ${path.relative(workingDir, typesFilePath)}`);
  }


  // Create the CSS file if requested
  if (css) {
    const cssContent = fileContentGenerator.createCssContent(kebabName);
    const cssFilePath = path.join(absoluteComponentDir, `${kebabName}.${styleExtension}`);
    const relativeCssFilePath = path.join(componentDir, `${kebabName}.${styleExtension}`);
    files[relativeCssFilePath] = cssContent;

    if (!dryRun) {
      fs.writeFileSync(cssFilePath, cssContent);
      logger.log(`✅ Created CSS file: ${path.relative(workingDir, cssFilePath)}`);
    }
  }

  // Create the test file if requested
  if (tests) {
    const testContent = fileContentGenerator.createTestContent(name, kebabName);
    const testFilePath = path.join(absoluteComponentDir, `${kebabName}.test.${fileExtension}`);
    const relativeTestFilePath = path.join(componentDir, `${kebabName}.test.${fileExtension}`);
    files[relativeTestFilePath] = testContent;

    if (!dryRun) {
      fs.writeFileSync(testFilePath, testContent);
      logger.log(`✅ Created test file: ${path.relative(workingDir, testFilePath)}`);
    }
  }

  // Create story file if requested
  if (stories) {
    const storyContent = fileContentGenerator.createStoryContent(name);
    const storyFilePath = path.join(absoluteComponentDir, `${kebabName}.stories.ts`);
    const relativeStoryFilePath = path.join(componentDir, `${kebabName}.stories.ts`);
    files[relativeStoryFilePath] = storyContent;

    if (!dryRun) {
      fs.writeFileSync(storyFilePath, storyContent);
      logger.log(`✅ Created story file: ${path.relative(workingDir, storyFilePath)}`);
    }
  }

  // Create the component.json file with metadata
  const metadata: Partial<ComponentMetadata> = {
    name: kebabName,
    type,
    description,
    version: '1.0.0',
    dependencies: [],
    devDependencies: [],
    registryDependencies: []
  };

  const metadataContent = JSON.stringify(metadata, null, 2);
  const metadataFilePath = path.join(absoluteComponentDir, 'component.json');
  const relativeMetadataFilePath = path.join(componentDir, 'component.json');
  files[relativeMetadataFilePath] = metadataContent;

  if (!dryRun) {
    fs.writeFileSync(metadataFilePath, metadataContent);
    logger.log(`✅ Created metadata file: ${path.relative(workingDir, metadataFilePath)}`);
  }

  return {
    componentDir: absoluteComponentDir,
    files
  };
}
