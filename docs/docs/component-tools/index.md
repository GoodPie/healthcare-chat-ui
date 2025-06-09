---
sidebar_position: 1
title: Component Tools
description: Tools for creating and managing components
---

# Component Tools

The Component Tools package provides a set of commands for creating, validating, registering, and documenting components in the Healthcare Chat UI Kit.

## Installation

The Component Tools are included in the Healthcare Chat UI Kit monorepo. If you're working within the monorepo, you can use the tools directly:

```bash
yarn workspace @healthcare-chat/component-tools component-tools <command>
```

For external projects, you can install the package:

```bash
npm install @healthcare-chat/component-tools
# or
yarn add @healthcare-chat/component-tools
```

## Available Commands

The Component Tools package provides the following commands:

| Command | Description |
| ------- | ----------- |
| [create-component](./commands/create-component.md) | Create a new component |
| [register](./commands/register.md) | Register a component in the registry |
| [validate](./commands/validate.md) | Validate a component |
| [docs](./commands/docs.md) | Generate documentation for a component |

## Typical Workflow

A typical workflow using the Component Tools might look like this:

1. **Create a new component**:
   ```bash
   component-tools create-component Button
   ```

2. **Implement the component**:
   Edit the generated files to implement your component.

3. **Validate the component**:
   ```bash
   component-tools validate ./src/components/Button
   ```

4. **Register the component**:
   ```bash
   component-tools register ./src/components/Button
   ```

5. **Generate documentation**:
   ```bash
   component-tools docs ./src/components/Button
   ```

## Configuration

The Component Tools can be configured using a configuration file or command-line options. See the [register command documentation](./commands/register.md#configuration) for details on configuration options.

## Error Handling

The Component Tools use a robust error handling system with custom error classes and detailed error messages. If you encounter an error, the error message will provide information about what went wrong and how to fix it.

## Next Steps

- [Create your first component](./commands/create-component.md)
- [Learn about component registration](./commands/register.md)
- [Understand component validation](./commands/validate.md)
- [Generate component documentation](./commands/docs.md)
