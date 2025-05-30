import * as fs from 'node:fs';
import * as path from 'node:path';
import { ComponentMetadata, FileWithContent } from '@healthcare-chat/core';
import { analyseDependencies, DetectedDependencies } from './dependency-analyser';

/**
 * Options for generating component metadata
 */
export interface GenerateMetadataOptions {
  /**
   * Component directory
   */
  componentDir: string;

  /**
   * Component name (optional, will be derived from directory name if not provided)
   */
  name?: string;

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
   * File extensions to include
   */
  fileExtensions?: string[];

  /**
   * Patterns to exclude
   */
  excludePatterns?: string[];

  /**
   * Whether to auto-detect dependencies
   */
  autoDetectDependencies?: boolean;
}

/**
 * Generate metadata for a component
 */
export async function generateMetadata(options: GenerateMetadataOptions): Promise<ComponentMetadata> {
  const {
    componentDir,
    name,
    description,
    type = 'registry:ui',
    // Ensure file extensions have dots for consistency
    fileExtensions = (options.fileExtensions || ['tsx', 'jsx', 'ts', 'js', 'css']).map(ext =>
      ext.startsWith('.') ? ext : `.${ext}`
    ),
    excludePatterns = [],
    autoDetectDependencies = true
  } = options;

  // Resolve the absolute path to the component directory
  const absoluteComponentDir = path.resolve(process.cwd(), componentDir);

  if (!fs.existsSync(absoluteComponentDir)) {
    throw new Error(`Directory "${componentDir}" not found.`);
  }

  // Read the metadata file if it exists
  const metadataPath = path.join(absoluteComponentDir, 'metadata.json');
  let metadata: Partial<ComponentMetadata> = {};

  if (fs.existsSync(metadataPath)) {
    try {
      metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
      console.log('📄 Found metadata.json file');
    } catch (error: unknown) {
      console.warn('Warning: Could not parse metadata.json file');
    }
  }

  // Read component.json as alternative metadata file
  const componentJsonPath = path.join(absoluteComponentDir, 'component.json');
  if (fs.existsSync(componentJsonPath)) {
    try {
      const componentJson = JSON.parse(fs.readFileSync(componentJsonPath, 'utf-8'));
      metadata = { ...metadata, ...componentJson };
      console.log('📄 Found component.json file');
    } catch (error: unknown) {
      console.warn('Warning: Could not parse component.json file');
    }
  }

  // Get all component files
  const allFiles = fs.readdirSync(absoluteComponentDir, { withFileTypes: true });
  const componentFiles: (FileWithContent & { type: string })[] = [];

  for (const dirent of allFiles) {
    if (dirent.isFile()) {
      const fileName = dirent.name;

      // Skip excluded files
      if (shouldExcludeFile(fileName, excludePatterns)) {
        continue;
      }

      // Check file extension
      const hasValidExtension = fileExtensions.some(ext => fileName.endsWith(ext));
      if (!hasValidExtension) {
        continue;
      }

      const filePath = path.join(absoluteComponentDir, fileName);
      const content = fs.readFileSync(filePath, 'utf-8');

      componentFiles.push({
        name: fileName,
        content,
        type: 'registry:ui'
      });
    }
  }

  if (componentFiles.length === 0) {
    throw new Error(`No component files found with extensions: ${fileExtensions.join(', ')}`);
  }

  console.log(`📁 Found ${componentFiles.length} component files`);

  // Get component name from directory name if not specified
  const componentName = name || metadata.name || path.basename(absoluteComponentDir);

  // Auto-detect dependencies if enabled
  let detectedDeps: DetectedDependencies = { dependencies: [], devDependencies: [] };
  if (autoDetectDependencies) {
    detectedDeps = analyseDependencies(componentFiles);
    console.log(`🔍 Auto-detected ${detectedDeps.dependencies.length} dependencies`);
  }

  // Prepare the component data
  return {
    name: componentName,
    type: metadata.type || type,
    description: description || metadata.description || `${componentName} component`,
    dependencies: metadata.dependencies || detectedDeps.dependencies,
    devDependencies: metadata.devDependencies || detectedDeps.devDependencies,
    registryDependencies: metadata.registryDependencies || [],
    files: componentFiles.map(file => ({
      name: file.name,
      content: file.content,
      type: file.type
    })),
    version: metadata.version || '1.0.0',
    author: metadata.author,
    license: metadata.license,
    tags: metadata.tags || []
  };
}

/**
 * Helper function to check if file should be excluded
 */
function shouldExcludeFile(fileName: string, excludePatterns: string[]): boolean {
  return excludePatterns.some(pattern => {
    const regex = new RegExp(pattern.replace(/\*/g, '.*'));
    return regex.test(fileName);
  });
}
