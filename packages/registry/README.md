# Healthcare Chat UI Registry

This package provides tools for creating, validating, registering, and documenting UI components for the Healthcare Chat UI Kit.

## Installation

```bash
# From the repository root
yarn workspace @healthcare-chat/registry build

# Use the tool
yarn registry <command>
```

## Commands

### Create Component

Creates a new component with the necessary files and structure.

```bash
yarn registry create-component <name> [options]
```

### Register Component

Registers an existing component in the registry.

```bash
yarn registry register <component-dir> [options]
```

### Validate Component

Validates a component against best practices.

```bash
yarn registry validate <component-dir> [options]
```

### Generate Documentation

Generates documentation for a component.

```bash
yarn registry docs <component-dir> [options]
```

## Documentation

For detailed documentation, see [Component Registration Tool Documentation](../docs/component-registration-tool.md).

## API Reference

This package exports the following:

### Commands

- `registerCommand` - Command to register components
- `createComponentCommand` - Command to create new components
- `validateCommand` - Command to validate components
- `docsCommand` - Command to generate component documentation

### Tools

- `createComponent` - Creates a new component
- `registerComponent` - Registers a component in the registry
- `registerComponentFromDir` - Registers a component from a directory
- `generateMetadata` - Generates component metadata
- `analyzeDependencies` - Analyzes component dependencies
- `analyzeRegistryDependencies` - Analyzes registry dependencies

### Types

- `ComponentMetadata` - Component metadata type
- `RegisterComponentOptions` - Options for registering a component
- `CreateComponentOptions` - Options for creating a component
- `GenerateMetadataOptions` - Options for generating metadata
- `FileWithContent` - File with content type
- `DetectedDependencies` - Detected dependencies type
- `RegistryConfig` - Registry configuration type

### Utilities

- `validateComponentMetadata` - Validates component metadata
- `loadConfig` - Loads configuration from file
