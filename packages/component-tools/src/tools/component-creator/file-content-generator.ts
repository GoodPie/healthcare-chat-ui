/**
 * Interface for file content generation
 */
export interface FileContentGenerator {
  /**
   * Create component file content
   */
  createComponentContent(
    name: string,
    options: { css: boolean }
  ): string;
  /**
   * Create the 'types' file content
   */
  createTypesContent(name: string): string;
  /**
   * Create CSS file content
   */
  createCssContent(kebabName: string): string;
  /**
   * Create test file content
   */
  createTestContent(
    name: string,
    kebabName: string,
  ): string;
  /**
   * Create story file content
   */
  createStoryContent(
    name: string,
  ): string;
}
/**
 * Default implementation of FileContentGenerator
 */
export const defaultFileContentGenerator: FileContentGenerator = {
  createComponentContent,
  createTypesContent,
  createCssContent,
  createTestContent,
  createStoryContent
};
/**
 * Create component file content
 */
function createComponentContent(
  name: string,
  options: { css: boolean }
): string {
  const {css} = options;
  const kebabName = name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
  let content = '';
  // Define the default imports
  content += `import {FC} from 'react';\n`;
  content += `import { cn } from '@sglara/cn';\n`;
  content += `import { ${name}Props } from './types';\n`;
  if (css) {
    content += `import './${kebabName}.css';\n`;
  }
  content += `\n`;
  content += `export const ${name}: FC<${name}Props> = ({ \n`;
  content += `  children, \n`;
  content += `  className,\n`;
  content += `  ...props\n`;
  content += `}) => {\n`;
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
 * Create the 'types' file content
 */
function createTypesContent(name: string): string {
  let content = '';
  content += `import {ReactNode} from 'react';\n\n`;
  content += `/**\n`;
  content += ` * Props for the ${name} component\n`;
  content += ` */\n`;
  content += `export interface ${name}Props extends React.HTMLAttributes<HTMLDivElement> {\n`;
  content += `  /**\n`;
  content += `   * The content of the component\n`;
  content += `   */\n`;
  content += `  children?: ReactNode;\n`;
  content += `\n`;
  content += `  /**\n`;
  content += `   * Additional CSS class names\n`;
  content += `   */\n`;
  content += `  className?: string;\n`;
  content += `}\n`;
  return content;
}
/**
 * Create the CSS file content
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
): string {
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
function createStoryContent(name: string): string {
  let content = '';
  content += `import type { Meta, StoryObj } from '@storybook/react';\n`;
  content += `import { ${name} } from './${name.toLowerCase()}';\n\n`;
  content += "";
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
  return content;
}
