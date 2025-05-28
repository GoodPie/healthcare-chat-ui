# Healthcare Chat UI Kit Development Guidelines

This document provides essential information for developers working on the Healthcare Chat UI Kit project. It covers build instructions, mono repo setup, and other important development details.

## Build/Configuration Instructions

### Prerequisites
- Node.js (v22+)
- Yarn Berry (v4.9.1+)

### Initial Setup
1. Clone the repository
2. Install dependencies:
   ```bash
   yarn
   ```
3. Build all packages:
   ```bash
   yarn build
   ```

### Development Workflow
1. Start the development server:
   ```bash
   yarn dev
   ```
2. Run Storybook to view and test components:
   ```bash
   yarn workspace @healthcare-chat/storybook storybook
   ```
3. Run tests:
   ```bash
   yarn test
   ```

### Building for Production
```bash
yarn build
```

## Mono Repo Setup

### Yarn Berry Workspace Configuration
This project uses Yarn Berry (v4.9.1) with Plug'n'Play (PnP) for dependency management. Key configuration:

- **PnP Mode**: Enabled for zero-installs and improved performance
- **Workspaces**: Configured in the root package.json
  ```json
  "workspaces": [
    "packages/*",
    "apps/*"
  ]
  ```
- **Workspace Dependencies**: Referenced using the `workspace:*` protocol
  ```json
  "dependencies": {
    "@healthcare-chat/core": "workspace:*"
  }
  ```

### Package Structure

#### Styling Package
- **Location**: `packages/design-tokens`
- **Purpose**: Contains all design tokens (colors, typography, spacing, etc.)
- **Usage**: Imported by UI components for consistent styling
- **Build Process**: Uses `tsx build.ts` to generate CSS files
- **Exports**: Various CSS files for different token categories

#### Components Package
- **Location**: `packages/ui`
- **Purpose**: Contains all UI components
- **Build Process**: Uses tsup to build ESM and CJS formats with TypeScript declarations
- **Dependencies**: Uses Tailwind CSS v4 for styling
- **Component Structure**: Each component has its own directory with:
  - Component implementation (.tsx)
  - Types (.ts)
  - Styles (.css)

#### Registration Package
- **Location**: `packages/registry`
- **Purpose**: Manages component metadata and registration
- **Usage**: Used by the CLI to install components
- **Schema Validation**: Uses Zod for schema validation

### CLI Package
- **Location**: `packages/cli`
- **Purpose**: Provides commands for installing and managing components
- **Commands**:
  - `init`: Initialize the library in a project
  - `add`: Add a component to a project
  - `list`: List available components
  - `register`: Register a new component
  - `update`: Update existing components

## Project Organization Guidelines

### Where to Put New Code

#### New Components
1. Create component in `packages/ui/src/components/[component-name]/`
2. Register component in `packages/registry/components/[component-name]/react.json`
3. Add Storybook story in `apps/storybook/src/stories/[ComponentName].stories.ts`

#### New Design Tokens
1. Add tokens to appropriate file in `packages/design-tokens/src/`
2. Rebuild design tokens with `yarn workspace @healthcare-chat/design-tokens build`

#### New CLI Commands
1. Add command file to `packages/cli/src/commands/`
2. Register command in `packages/cli/src/index.ts`

## Additional Development Information

### Tailwind CSS v4 Integration
This project uses Tailwind CSS v4 with the following configuration:

- **Installation**: Using Vite plugin (`@tailwindcss/vite`)
- **Configuration**: See https://tailwindcss.com/docs/installation/using-vite
- **Usage**: Components use Tailwind utility classes for styling
- **Custom Utilities**: Defined in design tokens using css
- **IMPORTANT**: Do not creat a `tailwind.config.js` file in any project. This is for Tailwind 3 and not relevant for tailwind 4.

### Component Development Process
Follow the process outlined in the design document:
1. **Design** → Create Figma designs following healthcare guidelines
2. **Implement** → Build React version first, then React Native
3. **Test** → Accessibility testing, cross-platform validation
4. **Document** → Storybook stories with medical use cases
5. **Registry** → Add to component registry with metadata
6. **CLI** → Update CLI with new component support

### Quality Standards
- **Accessibility**: All components must be WCAG 2.1 AA compliant
- **Performance**: Components should have minimal runtime overhead
- **Cross-platform**: Components should work on both web and mobile
- **Healthcare**: Components should follow healthcare design guidelines

### Testing Examples
The Storybook app contains working examples of all components. You can run it with:
```bash
yarn workspace @healthcare-chat/storybook storybook
```

Verify that the following examples work:
- MessageBubble with different statuses (sending, sent, delivered, read, failed)
- MessageStatus component
- Other UI components as they are added
