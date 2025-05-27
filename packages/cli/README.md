# Healthcare Chat UI CLI

A command-line interface for adding Healthcare Chat UI components to your project.

## Overview

This CLI tool allows you to easily add pre-built UI components from the Healthcare Chat UI Kit to your React or React Native project. It follows the "components as code" philosophy, where components are copied directly into your project, giving you full ownership and customization capabilities.

## How It Works

The CLI interacts with the component registry to fetch and install components:

1. **Component Registry**: The registry (`@healthcare-chat/registry`) is a collection of component templates and metadata stored as JSON files. Each component has:
   - Metadata (name, description, dependencies)
   - File templates with the actual component code
   - Platform-specific implementations (React, React Native)

2. **CLI Process**:
   - When you run `add <component>`, the CLI locates the component in the registry
   - It reads the component's metadata and file templates
   - It copies the component files to your project's `src/components/ui` directory
   - All dependencies and types are preserved

3. **Current Implementation**:
   - The CLI uses the registry package's exports to interact with the registry
   - It uses helper functions like `getComponentPath` to locate components
   - It validates component metadata using the `ComponentMetadataSchema`
   - It reads component JSON files and copies their content to your project

## Installation

You can use the CLI directly with npx:

```bash
npx @healthcare-chat/cli@latest <command>
```

Or install it globally:

```bash
npm install -g @healthcare-chat/cli
healthcare-chat-ui <command>
```

## Available Commands

### add

Adds a component to your project.

```bash
healthcare-chat-ui add <component-name> [options]
```

Options:
- `-t, --target-dir <dir>`: Target directory for components (default: `src/components/ui`)
- `-f, --framework <framework>`: Framework to use (react, vue, svelte) (default: `react`)
- `--force`: Overwrite existing component if it already exists

This command:
1. Checks if the component exists in the registry (local or remote)
2. Copies the component files to your project's target directory
3. Preserves all TypeScript types and styling
4. Reports any dependencies required by the component

Examples:
```bash
# Add a component with default options
healthcare-chat-ui add message-bubble

# Add a component to a custom directory
healthcare-chat-ui add message-bubble --target-dir src/ui/components

# Add a component for a specific framework
healthcare-chat-ui add message-bubble --framework react

# Force overwrite an existing component
healthcare-chat-ui add message-bubble --force
```

## Available Components

Currently, the following components are available:

- `message-bubble`: A chat message bubble with status indicators
- `message-status`: Status indicators for message delivery (sent, delivered, read)

## Configuration

The CLI can be configured using configuration files or package.json:

### Configuration Files

You can create a configuration file in your project root:

- `component-registry.config.json`
- `.component-registry.json`

Example configuration:
```json
{
  "registryUrl": "https://your-registry.com/api/components",
  "registryPath": "./path/to/local/registry",
  "targetDir": "src/ui/components",
  "framework": "react"
}
```

### Package.json Configuration

You can also add configuration to your package.json:

```json
{
  "name": "your-project",
  "version": "1.0.0",
  "componentRegistry": {
    "registryUrl": "https://your-registry.com/api/components",
    "registryPath": "./path/to/local/registry",
    "targetDir": "src/ui/components",
    "framework": "react"
  }
}
```

### Configuration Options

- `registryUrl`: URL to a remote component registry
- `registryPath`: Path to a local component registry
- `targetDir`: Directory where components will be installed (default: `src/components/ui`)
- `framework`: Framework to use (react, vue, svelte) (default: `react`)

If neither `registryUrl` nor `registryPath` is specified, the CLI will look for components in common locations.

## Additional Commands

### init

Initializes the Healthcare Chat UI configuration in your project.

```bash
healthcare-chat-ui init [options]
```

Options:
- `-u, --registry-url <url>`: URL to a remote component registry
- `-p, --registry-path <path>`: Path to a local component registry
- `-t, --target-dir <dir>`: Target directory for components (default: `src/components/ui`)
- `-f, --framework <framework>`: Framework to use (react, vue, svelte) (default: `react`)
- `--force`: Overwrite existing configuration if it exists

This command creates a `component-registry.config.json` file in your project root with the specified configuration options.

Examples:
```bash
# Initialize with default options
healthcare-chat-ui init

# Initialize with a custom registry URL
healthcare-chat-ui init --registry-url https://your-registry.com/api/components

# Initialize with a custom target directory
healthcare-chat-ui init --target-dir src/ui/components

# Force overwrite existing configuration
healthcare-chat-ui init --force
```

## Future Commands

The following commands are planned for future releases:

- `list`: List all available components
- `update`: Update existing components to the latest version

## Development

To build the CLI:

```bash
yarn build
```

To run the CLI in development mode:

```bash
yarn dev
```
