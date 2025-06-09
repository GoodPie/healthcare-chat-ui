---
sidebar_position: 3
title: validate
description: Validate a component
---

# validate

The `validate` command validates a component by checking its structure, metadata, and adherence to best practices. It analyzes the component directory, generates metadata, validates it against the schema, and provides warnings for potential issues.

## Usage

```bash
component-tools validate <component-dir> [options]
```

## Arguments

| Argument | Description |
| -------- | ----------- |
| `component-dir` | Directory containing the component to validate |

## Options

| Option | Default | Description |
| ------ | ------- | ----------- |
| `-p, --platform <platform>` | `react` | Platform (react, react-native) |
| `-n, --name <name>` | | Override component name |
| `-d, --description <description>` | | Component description |

## Validation Checks

The validate command performs the following checks:

1. **Directory Existence**: Verifies that the component directory exists
2. **Metadata Generation**: Generates metadata from the component files
3. **Schema Validation**: Validates the metadata against the component schema
4. **Best Practices**: Checks for adherence to best practices:
   - Component has a descriptive description (not generic)
   - Component has files
   - Component has a CSS file for styling
   - Component has a types file for type safety

## Examples

### Validate a component

```bash
component-tools validate ./src/components/Button
```

This validates the Button component in the specified directory.

### Validate a component with custom options

```bash
component-tools validate ./src/components/Avatar \
  --platform react \
  --description "User avatar component with various sizes"
```

This validates the Avatar component with a custom description.

### Validate a React Native component

```bash
component-tools validate ./src/components/MessageBubble \
  --platform react-native
```

This validates the MessageBubble component for React Native.

## Output

The command displays a summary of the validated component:

- Name
- Platform
- Number of files
- Number of dependencies
- Description (if provided)

If any potential issues are found, warnings are displayed with suggestions for improvement:

- Generic description warning
- Missing files warning
- Missing CSS file warning
- Missing types file warning

## Success and Error Handling

- **Success**: If validation passes, a success message is displayed along with the component summary
- **Warnings**: If validation passes but potential issues are found, warnings are displayed
- **Errors**: If validation fails, an error message is displayed with details about the failure

## Related Commands

- [create-component](./create-component.md) - Create a new component
- [register](./register.md) - Register a component in the registry
- [docs](./docs.md) - Generate documentation for a component
