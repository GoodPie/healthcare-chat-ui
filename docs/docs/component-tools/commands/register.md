---
sidebar_position: 2
title: register
description: Register a component in the registry
---

# register

The `register` command registers a component in the registry. It analyzes the component directory, generates metadata, validates it, and then registers the component either locally or remotely based on configuration.

## Usage

```bash
component-tools register <component-dir> [options]
```

## Arguments

| Argument | Description |
| -------- | ----------- |
| `component-dir` | Directory containing the component to register |

## Options

| Option | Default | Description |
| ------ | ------- | ----------- |
| `-p, --platform <platform>` | `react` | Platform (react, vue, svelte, react-native) |
| `-n, --name <name>` | | Override component name |
| `-d, --description <description>` | | Component description |
| `--dependencies <deps>` | | Comma-separated list of dependencies |
| `--file-type <type>` | `registry:ui` | File type for registry |
| `--local-only` | `false` | Register only to local registry (skip remote) |

## Configuration

The register command uses configuration from the following sources (in order of precedence):

1. Command line options
2. `component-tools.config.json` file
3. `.component-tools.json` file
4. `component-registry.config.json` file (legacy)
5. `.component-registry.json` file (legacy)
6. `componentTools` property in `package.json`
7. `componentRegistry` property in `package.json` (legacy)

Configuration options include:

| Option | Description |
| ------ | ----------- |
| `registryUrl` | URL of the remote registry |
| `registryPath` | Path to the local registry directory |
| `targetDir` | Target directory for component installation |
| `framework` | Default framework (react, react-native) |
| `autoDetectDependencies` | Whether to automatically detect dependencies |
| `fileExtensions` | File extensions to include |
| `excludePatterns` | Patterns to exclude from component files |

## Examples

### Register a component locally

```bash
component-tools register ./src/components/Button
```

This registers the Button component in the local registry.

### Register a component with custom options

```bash
component-tools register ./src/components/Avatar \
  --platform react \
  --description "User avatar component with various sizes" \
  --dependencies "react-icons,classnames"
```

This registers the Avatar component with a custom description and dependencies.

### Register a component for a specific platform

```bash
component-tools register ./src/components/MessageBubble \
  --platform react-native
```

This registers the MessageBubble component for React Native.

### Register a component locally only

```bash
component-tools register ./src/components/SimpleCard \
  --local-only
```

This registers the SimpleCard component in the local registry only, skipping remote registration.

## Output

The command generates a JSON file with component metadata and places it in the registry. The metadata includes:

- Component name
- Component type
- Description
- Dependencies
- Files with content
- Version (optional)
- Author (optional)
- License (optional)
- Tags (optional)

If registering locally, the file is saved to `<registryPath>/<componentName>/<platform>.json`.

## Component Summary

After registration, the command displays a summary of the registered component:

- Name
- Platform
- Number of files
- Number of dependencies
- Description (if provided)

## Related Commands

- [create-component](./create-component.md) - Create a new component
- [validate](./validate.md) - Validate a component
- [docs](./docs.md) - Generate documentation for a component
