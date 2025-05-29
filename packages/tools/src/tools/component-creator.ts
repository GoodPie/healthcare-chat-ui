#!/usr/bin/env node

import * as fs from 'node:fs';
import * as path from 'node:path';
import { ComponentMetadata } from '@healthcare-chat/core';

/**
 * Options for creating a new component
 */
export interface CreateComponentOptions {
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
   * Component platform
   */
  platform?: 'react' | 'react-native';

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
 * Create a new component
 */
export async function createComponent(options: CreateComponentOptions): Promise<string> {
  const {
    name,
    outputDir = './src/components',
    description = `${name} component`,
    type = 'registry:ui',
    platform = 'react',
    typescript = true,
    css = true,
    tests = false,
    stories = false
  } = options;

  // Use process.cwd() to get current working directory (where command is run from)
  const workingDir = process.cwd();
  console.log(`🔧 Working in: ${workingDir}`);

  // Validate component name
  if (!/^[A-Z][a-zA-Z0-9]*$/.test(name)) {
    throw new Error('Component name must be in PascalCase (e.g., MyComponent)');
  }

  // Create kebab-case version of the name
  const kebabName = name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();

  // Create component directory relative to current working directory
  const componentDir = path.join(outputDir, kebabName);
  const absoluteComponentDir = path.resolve(workingDir, componentDir);

  if (fs.existsSync(absoluteComponentDir)) {
    throw new Error(`Component directory already exists: ${componentDir}`);
  }

  fs.mkdirSync(absoluteComponentDir, { recursive: true });
  console.log(`✅ Created component directory: ${componentDir}`);

  // Create component files
  const fileExtension = typescript ? 'tsx' : 'jsx';
  const styleExtension = 'css';
  const typeExtension = 'ts';

  // Create component file
  const componentContent = createComponentContent(name, { typescript, css });
  const componentFilePath = path.join(absoluteComponentDir, `${kebabName}.${fileExtension}`);
  fs.writeFileSync(componentFilePath, componentContent);
  console.log(`✅ Created component file: ${path.relative(workingDir, componentFilePath)}`);

  // Create index file for easier imports
  const indexContent = `export { ${name} } from './${kebabName}';\n`;
  const indexFilePath = path.join(absoluteComponentDir, `index.${typescript ? 'ts' : 'js'}`);
  fs.writeFileSync(indexFilePath, indexContent);
  console.log(`✅ Created index file: ${path.relative(workingDir, indexFilePath)}`);

  // Create types file if using TypeScript
  if (typescript) {
    const typesContent = createTypesContent(name);
    const typesFilePath = path.join(absoluteComponentDir, `types.${typeExtension}`);
    fs.writeFileSync(typesFilePath, typesContent);
    console.log(`✅ Created types file: ${path.relative(workingDir, typesFilePath)}`);
  }

  // Create CSS file if requested
  if (css) {
    const cssContent = createCssContent(kebabName);
    const cssFilePath = path.join(absoluteComponentDir, `${kebabName}.${styleExtension}`);
    fs.writeFileSync(cssFilePath, cssContent);
    console.log(`✅ Created CSS file: ${path.relative(workingDir, cssFilePath)}`);
  }

  // Create test file if requested
  if (tests) {
    const testContent = createTestContent(name, kebabName, { typescript });
    const testFilePath = path.join(absoluteComponentDir, `${kebabName}.test.${fileExtension}`);
    fs.writeFileSync(testFilePath, testContent);
    console.log(`✅ Created test file: ${path.relative(workingDir, testFilePath)}`);
  }

  // Create story file if requested
  if (stories) {
    const storyContent = createStoryContent(name, { typescript });
    const storyFilePath = path.join(absoluteComponentDir, `${kebabName}.stories.${typescript ? 'ts' : 'js'}`);
    fs.writeFileSync(storyFilePath, storyContent);
    console.log(`✅ Created story file: ${path.relative(workingDir, storyFilePath)}`);
  }

  // Create component.json file with metadata
  const metadata: Partial<ComponentMetadata> = {
    name: kebabName,
    type,
    description,
    version: '1.0.0',
    dependencies: [],
    devDependencies: [],
    registryDependencies: []
  };

  const metadataFilePath = path.join(absoluteComponentDir, 'component.json');
  fs.writeFileSync(metadataFilePath, JSON.stringify(metadata, null, 2));
  console.log(`✅ Created metadata file: ${path.relative(workingDir, metadataFilePath)}`);

  return absoluteComponentDir;
}

/**
 * Create component file content
 */
function createComponentContent(
  name: string,
  options: { typescript: boolean; css: boolean }
): string {
  const { typescript, css } = options;
  const kebabName = name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();

  let content = '';

  if (typescript) {
    content += `import React from 'react';\n`;
    content += `import { cn } from '@sglara/cn';\n`;
    content += `import { ${name}Props } from './types';\n`;
  } else {
    content += `import React from 'react';\n`;
    content += `import { cn } from '@sglara/cn';\n`;
  }

  if (css) {
    content += `import './${kebabName}.css';\n`;
  }

  content += `\n`;

  if (typescript) {
    content += `export const ${name}: React.FC<${name}Props> = ({ \n`;
    content += `  children, \n`;
    content += `  className,\n`;
    content += `  ...props\n`;
    content += `}) => {\n`;
  } else {
    content += `export const ${name} = ({ children, className, ...props }) => {\n`;
  }

  content += `  return (\n`;
  content += `    <div \n`;
  content += `      className={cn('${kebabName}', className)}\n`;
  content += `      {...props}\n`;
  content += `    >\n`;
  content += `      {children}\n`;
  content += `    </div>\n`;
  content += `  );\n`;
  content += `};\n`;

  return content;
}

/**
 * Create types file content
 */
function createTypesContent(name: string): string {
  let content = '';
  content += `import React from 'react';\n\n`;
  content += `/**\n`;
  content += ` * Props for the ${name} component\n`;
  content += ` */\n`;
  content += `export interface ${name}Props extends React.HTMLAttributes<HTMLDivElement> {\n`;
  content += `  /**\n`;
  content += `   * The content of the component\n`;
  content += `   */\n`;
  content += `  children?: React.ReactNode;\n`;
  content += `\n`;
  content += `  /**\n`;
  content += `   * Additional CSS class names\n`;
  content += `   */\n`;
  content += `  className?: string;\n`;
  content += `}\n`;

  return content;
}

/**
 * Create CSS file content
 */
function createCssContent(kebabName: string): string {
  let content = '';
  content += `.${kebabName} {\n`;
  content += `  /* Add your styles here */\n`;
  content += `  display: block;\n`;
  content += `  padding: 1rem;\n`;
  content += `}\n`;

  return content;
}

/**
 * Create test file content
 */
function createTestContent(
  name: string,
  kebabName: string,
  options: { typescript: boolean }
): string {
  const { typescript } = options;

  let content = '';
  content += `import React from 'react';\n`;
  content += `import { render, screen } from '@testing-library/react';\n`;
  content += `import { ${name} } from './${kebabName}';\n\n`;

  content += `describe('${name}', () => {\n`;
  content += `  it('renders children correctly', () => {\n`;
  content += `    render(<${name}>Test content</${name}>);\n`;
  content += `    expect(screen.getByText('Test content')).toBeInTheDocument();\n`;
  content += `  });\n\n`;

  content += `  it('applies custom className', () => {\n`;
  content += `    const { container } = render(<${name} className="custom-class">Test</${name}>);\n`;
  content += `    const element = container.firstChild;\n`;
  content += `    expect(element).toHaveClass('${kebabName}');\n`;
  content += `    expect(element).toHaveClass('custom-class');\n`;
  content += `  });\n`;
  content += `});\n`;

  return content;
}

/**
 * Create story file content
 */
function createStoryContent(name: string, options: { typescript: boolean }): string {
  const { typescript } = options;

  let content = '';
  if (typescript) {
    content += `import type { Meta, StoryObj } from '@storybook/react';\n`;
    content += `import { ${name} } from './${name.toLowerCase()}';\n\n`;

    content += `const meta: Meta<typeof ${name}> = {\n`;
    content += `  title: 'UI/${name}',\n`;
    content += `  component: ${name},\n`;
    content += `  parameters: {\n`;
    content += `    layout: 'centered',\n`;
    content += `  },\n`;
    content += `  tags: ['autodocs'],\n`;
    content += `};\n\n`;

    content += `export default meta;\n`;
    content += `type Story = StoryObj<typeof ${name}>;\n\n`;

    content += `export const Default: Story = {\n`;
    content += `  args: {\n`;
    content += `    children: 'This is a ${name} component',\n`;
    content += `  },\n`;
    content += `};\n\n`;

    content += `export const WithCustomClass: Story = {\n`;
    content += `  args: {\n`;
    content += `    children: 'This has a custom class',\n`;
    content += `    className: 'custom-class',\n`;
    content += `  },\n`;
    content += `};\n`;
  } else {
    content += `import React from 'react';\n`;
    content += `import { ${name} } from './${name.toLowerCase()}';\n\n`;

    content += `export default {\n`;
    content += `  title: 'UI/${name}',\n`;
    content += `  component: ${name},\n`;
    content += `  parameters: {\n`;
    content += `    layout: 'centered',\n`;
    content += `  },\n`;
    content += `  tags: ['autodocs'],\n`;
    content += `};\n\n`;

    content += `export const Default = {\n`;
    content += `  args: {\n`;
    content += `    children: 'This is a ${name} component',\n`;
    content += `  },\n`;
    content += `};\n\n`;

    content += `export const WithCustomClass = {\n`;
    content += `  args: {\n`;
    content += `    children: 'This has a custom class',\n`;
    content += `    className: 'custom-class',\n`;
    content += `  },\n`;
    content += `};\n`;
  }

  return content;
}
