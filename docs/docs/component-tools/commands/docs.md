---
sidebar_position: 4
title: docs
description: Generate documentation for a component
---

# docs

The `docs` command generates documentation for a component based on its metadata, code, and types. It creates a markdown file with information about the component's usage, props, files, and dependencies.

## Usage

```bash
component-tools docs <component-dir> [options]
```

## Arguments

| Argument | Description |
| -------- | ----------- |
| `component-dir` | Directory containing the component to document |

## Options

| Option | Default | Description |
| ------ | ------- | ----------- |
| `-o, --output-file <file>` | `README.md` | Output file |
| `-p, --platform <platform>` | `react` | Platform (react, react-native) |
| `-n, --name <name>` | | Override component name |

## Documentation Generation

The docs command performs the following steps:

1. **Directory Verification**: Checks that the component directory exists
2. **Metadata Generation**: Generates metadata from the component files
3. **Props Extraction**: Extracts props from the component's types file (if available)
4. **Documentation Creation**: Generates a markdown file with the following sections:
   - Component name and description
   - Usage example
   - Props table (if props are found)
   - Files list
   - Dependencies list (if any)

## Examples

### Generate documentation for a component

```bash
component-tools docs ./src/components/Button
```

This generates documentation for the Button component and saves it as README.md in the component directory.

### Generate documentation with a custom output file

```bash
component-tools docs ./src/components/Avatar \
  --output-file DOCUMENTATION.md
```

This generates documentation for the Avatar component and saves it as DOCUMENTATION.md.

### Generate documentation for a React Native component

```bash
component-tools docs ./src/components/MessageBubble \
  --platform react-native
```

This generates documentation for the MessageBubble component for React Native.

## Output

The command generates a markdown file with the following sections:

### Component Name and Description

```markdown
# ComponentName

Component description goes here.
```

### Usage Example

```markdown
## Usage

```jsx
import { ComponentName } from './component-name';

function Example() {
  return <ComponentName>Example content</ComponentName>;
}
```
```

### Props Table (if available)

```markdown
## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| prop1 | string | - | Description of prop1 |
| prop2 | number | 0 | Description of prop2 |
```

### Files List

```markdown
## Files

- `component-name.tsx`
- `types.ts`
- `styles.css`
```

### Dependencies List (if any)

```markdown
## Dependencies

- react
- classnames
```

## Success and Error Handling

- **Success**: If documentation generation succeeds, a success message is displayed with the path to the generated file
- **Errors**: If documentation generation fails, an error message is displayed with details about the failure

## Related Commands

- [create-component](./create-component.md) - Create a new component
- [register](./register.md) - Register a component in the registry
- [validate](./validate.md) - Validate a component
