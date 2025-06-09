export interface RegistryConfig {
  registryUrl?: string;
  registryPath?: string;
  targetDir?: string;
  framework?: 'react';
  autoDetectDependencies: boolean;
  fileExtensions: ("tsx" | "jsx" | "ts" | "js" | "css")[];
  excludePatterns?: string[];
}

export const defaultConfig: RegistryConfig = {
  targetDir: 'src/components/ui',
  framework: 'react',
  autoDetectDependencies: true,
  fileExtensions: ['tsx', 'jsx', 'ts', 'js', "css"],
};

export const defaultPlatform = 'react';
