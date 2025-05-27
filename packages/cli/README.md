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
healthcare-chat-ui add <component-name>
```

This command:
1. Checks if the component exists in the registry
2. Copies the component files to your project's `src/components/ui/<component-name>` directory
3. Preserves all TypeScript types and styling

Example:
```bash
healthcare-chat-ui add message-bubble
```

## Available Components

Currently, the following components are available:

- `message-bubble`: A chat message bubble with status indicators
- `message-status`: Status indicators for message delivery (sent, delivered, read)

## Future Commands

The following commands are planned for future releases:

- `init`: Initialize the Healthcare Chat UI configuration in your project
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
