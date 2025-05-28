# Healthcare Chat UI Library

**Version:** 0.1.0 (Pre-release)
**Status:** Early Development (Bootstrapping Phase)

---

A **Shadcn-inspired, copy-pasteable UI component library** designed for building secure, compliant, and accessible chat interfaces for healthcare professionals on **React and React Native** platforms.

This library provides unstyled, fully customizable components that developers can copy directly into their projects, giving them full control over the code, styling, and behavior. It's built with a focus on developer experience, healthcare-specific requirements, and performance.

## 🎯 Key Goals & Philosophy

* **Developer Experience:** Simple copy-paste components with an intuitive CLI tool (à la Shadcn). No black-box dependencies.
* **Healthcare Focus:** Components designed with medical communication workflows, security, and compliance in mind.
* **Cross-Platform:** Unified API where possible for React (Web) and React Native (Mobile) components.
* **Performance:** Zero runtime overhead. Components are built directly into your application.
* **Accessibility:** Striving for WCAG 2.1 AA compliance for all components.
* **"Components as Code":** We distribute source code, not compiled packages. You own and can customize everything.

## ⚠️ Project Status
This project is currently in its **initial development and bootstrapping phase**, based on the [Chat UI Library Design Document](./DESIGN_DOCUMENT.md). I am actively working on Phase 1: Foundation, which includes setting up the monorepo, core utilities, design tokens, and the basic CLI.

## ✨ Features (Planned)

* **CLI Tool:** For easy initialization and adding of components.
* **Component Registry:** A collection of well-crafted UI components.
    * Message Components (Bubbles, Lists, Threads)
    * Input Components (Text, File, Voice)
    * Navigation Components (Headers, Chat Lists)
    * User Components (Avatars, Presence Indicators)
    * Layout Components (Chat Rooms, Sidebars)
* **Design Tokens:** A healthcare-specific color palette, typography scale, and spacing system.
* **React & React Native Support:** Dedicated implementations for both platforms.
* **Tailwind CSS / NativeWind:** For flexible and utility-first styling.
* **Comprehensive Documentation:** Including Storybook examples and usage guides.

## 🏗️ High-Level Architecture

Healthcare Chat UI Kit
├── Registry (Component Templates & Metadata)
├── CLI Tool (Component Installation & Management)
├── Core Utilities (Shared Logic, Types, Hooks)
├── Design Tokens (Healthcare Themes & Styles)
└── Platform Implementations
├── React (Web)
└── React Native (Mobile)

## 🚀 Getting Started

We provide two main tools for working with the Healthcare Chat UI Kit:

1. **CLI Tool**: For users who want to add components to their projects
2. **Component Registration Tool**: For developers who want to create and register new components

### How the CLI Works with the Registry

The CLI interacts with the component registry to fetch and install components:

1. **Component Registry**: The registry (`packages/registry`) contains:
   - Component metadata (name, description, dependencies)
   - Component file templates with the actual code
   - Platform-specific implementations (React, React Native)

2. **CLI Process**:
   - When you run the `add` command, the CLI locates the component in the registry
   - It reads the component's metadata and file templates from JSON files
   - It copies the component files to your project's `src/components/ui` directory
   - All dependencies and types are preserved

This "components as code" approach gives you full ownership of the components in your project.

### Component Registration Tool

The Component Registration Tool is designed for developers who want to create and register new components for the Healthcare Chat UI Kit. It provides a streamlined workflow for component development:

1. **Create Component**: Scaffold a new component with the necessary files and structure
2. **Validate Component**: Check the component against best practices
3. **Generate Documentation**: Create documentation for the component
4. **Register Component**: Add the component to the registry

For detailed documentation, see [Component Registration Tool Documentation](./docs/component-registration-tool.md).

### Installation

#### CLI Tool (for users)

You can use the CLI directly with npx:

```bash
npx @healthcare-chat/cli@latest <command>
```

Or install it globally:

```bash
npm install -g @healthcare-chat/cli
healthcare-chat-ui <command>
```

#### Component Registration Tool (for developers)

The Component Registration Tool is included in the Healthcare Chat UI Kit repository:

```bash
# From the repository root
yarn workspace @healthcare-chat/registry build

# Use the tool
yarn registry <command>
```

### Available Commands

#### CLI Tool Commands

```bash
# Add a component to your project
npx healthcare-chat-ui add <component-name>

# Example: Add the message-bubble component
npx healthcare-chat-ui add message-bubble
```

This will copy the component files to your project's `src/components/ui/<component-name>` directory.

#### Component Registration Tool Commands

```bash
# Create a new component
yarn registry create-component <name> [options]

# Register an existing component
yarn registry register <component-dir> [options]

# Validate a component
yarn registry validate <component-dir> [options]

# Generate documentation for a component
yarn registry docs <component-dir> [options]
```

For detailed documentation on these commands, see the [Component Registration Tool Documentation](./docs/component-registration-tool.md).

### Available Components

Currently, the following components are available:

- `message-bubble`: A chat message bubble with status indicators
- `message-status`: Status indicators for message delivery (sent, delivered, read)

More components will be added in future releases.

## 🤝 Contributing

We welcome contributions to the Healthcare Chat UI Kit! Here's how you can help:

### Development Setup

For detailed development guidelines, please refer to our [Development Guidelines](./docs/development-guidelines.md) documentation.

We also maintain specific guidelines for:
- [TypeScript Configuration](./docs/typescript-configuration.md)
- [Git Branching Strategy](./docs/git-branching-strategy.md)

1. Clone the repository
2. Install dependencies with `yarn install`
3. Build the packages with `yarn build`

### Project Structure

- `packages/cli`: The CLI tool for users to add components to their projects
- `packages/registry`: Component registry and developer tools for creating, validating, and registering components
- `packages/ui`: React implementations of components
- `packages/design-tokens`: Healthcare-specific design tokens
- `packages/core`: Shared utilities, types, and hooks
- `apps/storybook`: Component documentation and examples

For more details on the registry package and its tools, see the [Component Registration Tool Documentation](./docs/component-registration-tool.md).

### Adding New Components

You can use the Component Registration Tool to create and register new components:

1. Create a new component using the registration tool:
   ```bash
   yarn registry create-component MyComponent --tests --stories
   ```

2. Implement the component logic in the generated files

3. Validate the component:
   ```bash
   yarn registry validate ./src/components/my-component
   ```

4. Generate documentation:
   ```bash
   yarn registry docs ./src/components/my-component
   ```

5. Register the component:
   ```bash
   yarn registry register ./src/components/my-component
   ```

6. Update the Storybook examples

7. Submit a pull request

For more detailed instructions, see the [Component Registration Tool Documentation](./docs/component-registration-tool.md).

### Coding Standards

- Follow TypeScript best practices
- Ensure components are accessible (WCAG 2.1 AA)
- Write tests for new components
- Document your code with JSDoc comments
