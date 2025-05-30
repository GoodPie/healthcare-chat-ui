---
sidebar_position: 1
title: create-component
description: Create a new component
---

# create-component

The `create-component` command creates a new component with the specified name and options. It generates the necessary files based on the provided options and places them in the specified output directory.

## Usage

```bash
component-tools create-component <name> [options]
```

## Arguments

| Argument | Description |
| -------- | ----------- |
| `name` | Component name (PascalCase) |

## Options

| Option | Default | Description |
| ------ | ------- | ----------- |
| `-o, --output-dir <dir>` | `./src/components` | Output directory |
| `-d, --description <description>` | `<name> component` | Component description |
| `-p, --platform <platform>` | `react` | Platform (react, react-native) |
| `-t, --type <type>` | `registry:ui` | Component type |
| `--no-typescript` | | Use JavaScript instead of TypeScript |
| `--no-css` | | Skip CSS file creation |
| `--tests` | `false` | Create test files |
| `--stories` | `false` | Create story files |

## Examples

### Create a basic React component

```bash
component-tools create-component Button
```

This creates a new Button component in the default directory (`./src/components`) with TypeScript and CSS files.

### Create a component with custom options

```bash
component-tools create-component Avatar \
  --output-dir ./src/components/ui \
  --description "User avatar component with various sizes" \
  --tests \
  --stories
```

This creates a new Avatar component in the specified directory with test and story files.

### Create a React Native component

```bash
component-tools create-component MessageBubble \
  --platform react-native \
  --description "Chat message bubble component"
```

This creates a new MessageBubble component for React Native.

### Create a JavaScript component (no TypeScript)

```bash
component-tools create-component SimpleCard \
  --no-typescript
```

This creates a new SimpleCard component using JavaScript instead of TypeScript.

## Output

The command creates a directory with the component name containing the following files (depending on the options):

- Component implementation file (`.tsx` or `.jsx`)
- Types file (`types.ts`) if using TypeScript
- CSS file (`.css`) if not disabled
- Test file (`.test.tsx` or `.test.jsx`) if tests option is enabled
- Story file (`.stories.tsx` or `.stories.jsx`) if stories option is enabled

## Next Steps

After creating a component, you can:

1. Implement your component logic
2. Register your component with the registry using the `register` command:

```bash
component-tools register <component-dir>
```

## Related Commands

- [register](./register.md) - Register a component in the registry
- [validate](./validate.md) - Validate a component
- [docs](./docs.md) - Generate documentation for a component
