/**
 * Dependency analyzer for component files
 */

/**
 * File with content
 */
export interface FileWithContent {
  name: string;
  content: string;
}

/**
 * Detected dependencies
 */
export interface DetectedDependencies {
  /**
   * Runtime dependencies
   */
  dependencies: string[];
  
  /**
   * Development dependencies
   */
  devDependencies: string[];
}

/**
 * Analyze dependencies in component files
 */
export function analyzeDependencies(files: FileWithContent[]): DetectedDependencies {
  const dependencies = new Set<string>();
  const devDependencies = new Set<string>();
  
  for (const file of files) {
    const content = file.content;
    
    // Check if file is a test or story file
    const isTestFile = file.name.includes('.test.') || file.name.includes('.spec.');
    const isStoryFile = file.name.includes('.stories.') || file.name.includes('.story.');
    const isMockFile = file.name.includes('.mock.');
    const isDevFile = isTestFile || isStoryFile || isMockFile;
    
    // Match import statements
    const importMatches = content.matchAll(/^import.*from\s+['"]([^'"]+)['"]/gm);
    for (const match of importMatches) {
      const packageName = match[1];
      
      // Skip relative imports
      if (packageName.startsWith('.') || packageName.startsWith('/')) {
        continue;
      }
      
      // Extract package name (handle scoped packages)
      const parts = packageName.split('/');
      const actualPackageName = packageName.startsWith('@') 
        ? `${parts[0]}/${parts[1]}` 
        : parts[0];
      
      // Common dev dependencies patterns
      if (isDevFile || 
          actualPackageName.includes('test') || 
          actualPackageName.includes('story') || 
          actualPackageName.includes('mock') ||
          actualPackageName.includes('jest') ||
          actualPackageName.includes('storybook')) {
        devDependencies.add(actualPackageName);
      } else {
        dependencies.add(actualPackageName);
      }
    }
    
    // Match require statements
    const requireMatches = content.matchAll(/require\(['"]([^'"]+)['"]\)/gm);
    for (const match of requireMatches) {
      const packageName = match[1];
      if (!packageName.startsWith('.') && !packageName.startsWith('/')) {
        const parts = packageName.split('/');
        const actualPackageName = packageName.startsWith('@') 
          ? `${parts[0]}/${parts[1]}` 
          : parts[0];
          
        if (isDevFile) {
          devDependencies.add(actualPackageName);
        } else {
          dependencies.add(actualPackageName);
        }
      }
    }
  }
  
  return {
    dependencies: Array.from(dependencies),
    devDependencies: Array.from(devDependencies)
  };
}

/**
 * Analyze registry dependencies in component files
 */
export function analyzeRegistryDependencies(files: FileWithContent[]): string[] {
  const registryDependencies = new Set<string>();
  
  for (const file of files) {
    const content = file.content;
    
    // Match import statements for registry components
    // This is a simplified approach - in a real implementation, you would need
    // to analyze the imports more carefully to determine if they are registry components
    const importMatches = content.matchAll(/^import.*from\s+['"]\.\.\/([^\/'"]+)['"]/gm);
    for (const match of importMatches) {
      const componentName = match[1];
      registryDependencies.add(componentName);
    }
  }
  
  return Array.from(registryDependencies);
}
