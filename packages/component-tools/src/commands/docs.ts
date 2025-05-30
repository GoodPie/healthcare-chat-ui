import { Command } from 'commander';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { ComponentMetadata } from '@healthcare-chat/core';
import { generateMetadata } from '@/tools';

/**
 * Command to generate documentation for a component
 */
export const docsCommand = new Command('docs')
  .description('Generate documentation for a component')
  .argument('<component-dir>', 'Directory containing the component to document')
  .option('-o, --output-file <file>', 'Output file', 'README.md')
  .option('-p, --platform <platform>', 'Platform (react, react-native)', 'react')
  .option('-n, --name <name>', 'Override component name')
  .action(async (componentDir: string, options: {
    outputFile?: string;
    platform?: 'react' | 'react-native';
    name?: string;
  }) => {
    try {
      console.log(`Generating documentation for component in ${componentDir}...`);
      
      // Resolve the absolute path to the component directory
      const absoluteComponentDir = path.resolve(process.cwd(), componentDir);
      if (!fs.existsSync(absoluteComponentDir)) {
        throw new Error(`Directory "${componentDir}" not found.`);
      }
      
      // Generate metadata
      const metadata = await generateMetadata({
        componentDir,
        name: options.name,
        platform: options.platform
      });
      
      // Generate documentation
      const docs = generateDocumentation(metadata, options.platform || 'react');
      
      // Write documentation to file
      const outputPath = path.join(absoluteComponentDir, options.outputFile || 'README.md');
      fs.writeFileSync(outputPath, docs);
      
      console.log(`✅ Documentation generated at ${outputPath}`);
    } catch (error) {
      console.error('Error generating documentation:', error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

/**
 * Generate documentation for a component
 */
function generateDocumentation(metadata: ComponentMetadata, platform: 'react' | 'react-native'): string {
  const { name, description, dependencies, files } = metadata;
  
  // Find component file
  const componentFile = files.find((file) =>
    file.name.endsWith('.tsx') || file.name.endsWith('.jsx')
  );
  
  // Find types file
  const typesFile = files.find((file) => file.name === 'types.ts');
  
  // Extract props from types file if available
  const props = typesFile ? extractProps(typesFile.content) : [];
  
  // Generate documentation
  let doc = `# ${name}\n\n`;
  
  if (description) {
    doc += `${description}\n\n`;
  }
  
  // Usage section
  doc += `## Usage\n\n`;
  doc += '```jsx\n';
  doc += `import { ${name} } from './${name.toLowerCase()}';\n\n`;
  doc += `function Example() {\n`;
  doc += `  return <${name}>Example content</${name}>;\n`;
  doc += `}\n`;
  doc += '```\n\n';
  
  // Props section if available
  if (props.length > 0) {
    doc += `## Props\n\n`;
    doc += `| Name | Type | Default | Description |\n`;
    doc += `| ---- | ---- | ------- | ----------- |\n`;
    props.forEach(prop => {
      doc += `| ${prop.name} | ${prop.type} | ${prop.default || '-'} | ${prop.description || '-'} |\n`;
    });
    doc += '\n';
  }
  
  // Files section
  doc += `## Files\n\n`;
  files.forEach((file) => {
    doc += `- \`${file.name}\`\n`;
  });
  doc += '\n';
  
  // Dependencies section if available
  if (dependencies && dependencies.length > 0) {
    doc += `## Dependencies\n\n`;
    dependencies.forEach((dep: string) => {
      doc += `- ${dep}\n`;
    });
    doc += '\n';
  }
  
  return doc;
}

/**
 * Extract props from TypeScript interface
 */
function extractProps(content: string): Array<{ name: string; type: string; default?: string; description?: string }> {
  const props: Array<{ name: string; type: string; default?: string; description?: string }> = [];
  
  // Find interface definition
  const interfaceMatch = content.match(/interface\s+(\w+)Props\s*{([^}]*)}/s);
  if (!interfaceMatch) return props;
  
  const interfaceContent = interfaceMatch[2];
  
  // Match each prop definition
  const propMatches = interfaceContent.matchAll(/\/\*\*\s*([\s\S]*?)\s*\*\/\s*(\w+)(\?)?:\s*([^;]+);/g);
  
  for (const match of propMatches) {
    const [_, commentBlock, name, optional, type] = match;
    
    // Extract description from comment block
    let description = '';
    if (commentBlock) {
      const descMatch = commentBlock.match(/@description\s+(.+)/);
      if (descMatch) {
        description = descMatch[1].trim();
      } else {
        // Try to extract description from the first line of the comment
        const lines = commentBlock.split('\n');
        if (lines.length > 0) {
          description = lines[0].trim().replace(/\*/g, '').trim();
        }
      }
    }
    
    // Extract default value if mentioned in comment
    let defaultValue;
    if (commentBlock) {
      const defaultMatch = commentBlock.match(/@default\s+(.+)/);
      if (defaultMatch) {
        defaultValue = defaultMatch[1].trim();
      }
    }
    
    props.push({
      name,
      type: type.trim(),
      ...(defaultValue ? { default: defaultValue } : {}),
      ...(description ? { description } : {})
    });
  }
  
  return props;
}
