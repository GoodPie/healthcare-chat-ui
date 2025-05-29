# Component Registration Tool Documentation

## Overview of Changes

This document provides a comprehensive list of changes made to implement the new component registration tool, as well as detailed documentation on how to use it.

### Files Created

1. **Strategy Document**
   - `docs/component-registry-migration-strategy.md` - Migration strategy document

2. **Registry Package - Commands**
   - `packages/registry/src/commands/register.ts` - Command to register components
   - `packages/registry/src/commands/create-component.ts` - Command to create new components
   - `packages/registry/src/commands/validate.ts` - Command to validate components
   - `packages/registry/src/commands/docs.ts` - Command to generate component documentation

3. **Registry Package - Tools**
   - `packages/registry/src/tools/component-creator.ts` - Tool for creating component scaffolding
   - `packages/registry/src/tools/dependency-analyser.ts` - Tool for analyzing component dependencies
   - `packages/registry/src/tools/metadata-generator.ts` - Tool for generating component metadata
   - `packages/registry/src/tools/client.ts` - Client for interacting with component registry

4. **Registry Package - Configuration**
   - `packages/registry/src/types/config.ts` - Configuration types
   - `packages/registry/src/utils/config.ts` - Configuration utilities
   - `packages/registry/src/utils/validation.ts` - Validation utilities

5. **Registry Package - CLI Entry Point**
   - `packages/registry/bin/registry.ts` - CLI entry point for registry commands

### Files Modified

1. **CLI Package**
   - `packages/cli/src/commands/register.ts` - Simplified to use registry package
   - `packages/cli/src/commands/add.ts` - Updated to use registry package types
   - `packages/cli/src/commands/init.ts` - Updated to use registry package types
   - `packages/cli/src/registry/client.ts` - Updated to use registry package types
   - `packages/cli/src/utils/config.ts` - Updated to use registry package types
   - `packages/cli/src/utils/validation.ts` - Updated to use registry package types

2. **Registry Package**
   - `packages/registry/package.json` - Added CLI bin entry and dependencies
   - `packages/registry/src/index.ts` - Updated exports to include new functionality

### Changes by Functionality

1. **Component Registration**
   - Moved registration logic from CLI to Registry package
   - Improved type safety with proper TypeScript interfaces
   - Enhanced error handling with proper error types
   - Added validation of component metadata

2. **Component Creation**
   - Added new functionality to scaffold components
   - Support for TypeScript, CSS, tests, and stories
   - Automatic generation of component metadata

3. **Component Validation**
   - Added new functionality to validate components
   - Checks for common issues and best practices
   - Provides warnings and suggestions

4. **Documentation Generation**
   - Added new functionality to generate component documentation
   - Extracts props from TypeScript interfaces
   - Generates Markdown documentation

5. **Dependency Analysis**
   - Enhanced dependency detection with better patterns
   - Support for development dependencies
   - Support for registry dependencies

## Component Registration Tool

### Purpose

The Component Registration Tool is a set of utilities and commands designed to streamline the process of creating, validating, registering, and documenting UI components for the Healthcare Chat UI Kit. It provides a consistent workflow for component development and ensures that components adhere to best practices.

### Installation

The tool is included in the Healthcare Chat UI Kit repository and can be used via yarn:

```bash
# From the repository root
yarn workspace @healthcare-chat/registry build

# Use the tool
yarn registry <command>
```

### Commands

#### 1. Create Component

Creates a new component with the necessary files and structure.

```bash
yarn registry create-component <name> [options]
```

**Arguments:**
- `name` - Component name in PascalCase (e.g., MessageBubble)

**Options:**
- `-o, --output-dir <dir>` - Output directory (default: './src/components')
- `-d, --description <description>` - Component description
- `-p, --platform <platform>` - Platform (react, react-native) (default: 'react')
- `-t, --type <type>` - Component type (default: 'registry:ui')
- `--no-typescript` - Use JavaScript instead of TypeScript
- `--no-css` - Skip CSS file creation
- `--tests` - Create test files
- `--stories` - Create story files

**Example:**
```bash
yarn registry create-component MessageInput --output-dir ./src/components/chat --description "Input field for chat messages" --tests --stories
```

#### 2. Register Component

Registers an existing component in the registry.

```bash
yarn registry register <component-dir> [options]
```

**Arguments:**
- `component-dir` - Directory containing the component to register

**Options:**
- `-p, --platform <platform>` - Platform (react, react-native) (default: 'react')
- `-n, --name <name>` - Override component name
- `-d, --description <description>` - Component description
- `--dependencies <deps>` - Comma-separated list of dependencies
- `--file-type <type>` - File type for registry (default: 'registry:ui')
- `--local-only` - Register only to local registry (skip remote)

**Example:**
```bash
yarn registry register ./src/components/message-bubble --platform react --description "A component for displaying chat messages"
```

#### 3. Validate Component

Validates a component against best practices.

```bash
yarn registry validate <component-dir> [options]
```

**Arguments:**
- `component-dir` - Directory containing the component to validate

**Options:**
- `-p, --platform <platform>` - Platform (react, react-native) (default: 'react')
- `-n, --name <name>` - Override component name
- `-d, --description <description>` - Component description

**Example:**
```bash
yarn registry validate ./src/components/message-bubble
```

#### 4. Generate Documentation

Generates documentation for a component.

```bash
yarn registry docs <component-dir> [options]
```

**Arguments:**
- `component-dir` - Directory containing the component to document

**Options:**
- `-o, --output <file>` - Output file (default: 'README.md')
- `-p, --platform <platform>` - Platform (react, react-native) (default: 'react')
- `-n, --name <name>` - Override component name

**Example:**
```bash
yarn registry docs ./src/components/message-bubble --output DOCUMENTATION.md
```

### Developer Workflow

The Component Registration Tool supports the following workflow for component development:

1. **Create Component**
   ```bash
   yarn registry create-component MyComponent --output-dir ./src/components/ui --tests --stories
   ```
   This creates a new component with the necessary files and structure.

2. **Implement Component**
   Implement the component logic in the generated files.

3. **Validate Component**
   ```bash
   yarn registry validate ./src/components/ui/my-component
   ```
   This validates the component against best practices and provides warnings and suggestions.

4. **Generate Documentation**
   ```bash
   yarn registry docs ./src/components/ui/my-component
   ```
   This generates documentation for the component.

5. **Register Component**
   ```bash
   yarn registry register ./src/components/ui/my-component
   ```
   This registers the component in the registry, making it available for use in other projects.

### Configuration

The Component Registration Tool can be configured using a `component-registry.config.json` file in the project root. The following options are available:

```json
{
  "registryUrl": "https://example.com/registry",
  "registryPath": "./registry",
  "targetDir": "src/components/ui",
  "framework": "react",
  "autoDetectDependencies": true,
  "fileExtensions": ["tsx", "jsx", "ts", "js", "css"],
  "excludePatterns": ["*.test.*", "*.stories.*"]
}
```

- `registryUrl` - URL to a remote registry
- `registryPath` - Path to a local registry
- `targetDir` - Target directory for components
- `framework` - Framework to use (react, react-native)
- `autoDetectDependencies` - Whether to auto-detect dependencies
- `fileExtensions` - File extensions to include
- `excludePatterns` - Patterns to exclude

### Integration with CLI

The Component Registration Tool is integrated with the Healthcare Chat UI CLI, which provides commands for installing components in projects:

```bash
# Initialize a project
healthcare-chat-ui init

# Add a component
healthcare-chat-ui add message-bubble
```

The CLI uses the registry to find and install components, while the registry tool is used for component development and registration.

## Conclusion

The Component Registration Tool provides a streamlined workflow for component development, validation, documentation, and registration. It ensures that components adhere to best practices and provides a consistent experience for developers working on the Healthcare Chat UI Kit.
