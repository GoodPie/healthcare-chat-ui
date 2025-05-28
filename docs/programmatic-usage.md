# Programmatic Usage of the Registry Package

This document provides information on how to use the registry package programmatically, including examples and best practices.

## Overview

The registry package provides a set of functions for creating, validating, registering, and analyzing UI components. These functions can be used programmatically in your own scripts or applications.

## Example Script

The `examples/programmatic-usage.ts` file demonstrates how to use the registry package programmatically. It includes examples of:

1. Creating a new component
2. Generating metadata for a component
3. Validating component metadata
4. Registering a component
5. Analyzing dependencies in component files

## Changes Made

The following changes were made to the `programmatic-usage.ts` file to ensure it works correctly:

1. **Import Path Clarification**: Updated the import statement to use `registerComponentFromDir as registerComponent` to clarify which `registerComponent` function to use. There are two different `registerComponent` functions in the codebase: one in `utils/register.ts` and one in `commands/register.ts`. The one in `commands/register.ts` is exported as `registerComponentFromDir` in the `index.ts` file.

2. **Improved Error Handling**: Added proper typing for error parameters in catch blocks and improved error message extraction. This ensures that error messages are displayed correctly and provides better debugging information.

## Best Practices

When using the registry package programmatically, consider the following best practices:

1. **Use the Correct Import Paths**: Import functions and types directly from `@healthcare-chat/registry` rather than using relative imports.

2. **Handle Errors Properly**: Use proper error typing and error message extraction to ensure that error messages are displayed correctly.

3. **Use the Correct Function for the Task**: Be aware that there are multiple functions with similar names in the codebase. Use the function that best fits your needs.

4. **Validate Metadata**: Always validate component metadata before using it to ensure that it conforms to the expected schema.

5. **Use Type Annotations**: Use TypeScript type annotations to ensure that your code is type-safe and to catch errors at compile time.

## Running the Example

To run the example script, you need to have the registry package built:

```bash
cd packages/registry
yarn build
```

Then you can run the script using a TypeScript runner like ts-node:

```bash
npx ts-node examples/programmatic-usage.ts
```

## Troubleshooting

If you encounter issues when running the script, consider the following:

1. **Path Aliases**: The `@/` path alias is configured in the `tsconfig.json` file, but it might not be resolved correctly when running the script directly. Use relative imports or ensure that your TypeScript runner is configured to resolve path aliases.

2. **Missing Dependencies**: Ensure that all required dependencies are installed. The registry package depends on several packages, including `fs-extra`, `commander`, and `zod`.

3. **TypeScript Configuration**: Ensure that your TypeScript configuration is compatible with the registry package. The registry package uses TypeScript 5.8.3 and targets ES2020.
