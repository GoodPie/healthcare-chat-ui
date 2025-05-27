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

## 🚀 Getting Started (For Users of the Library - Future)

Once the CLI and initial components are ready, you'll be able to integrate them into your project like this:

```bash
# Initialize healthcare-chat-ui in your project
npx healthcare-chat-ui@latest init

# Add a specific component
npx healthcare-chat-ui@latest add message-bubble

# Add a complete chat template
npx healthcare-chat-ui@latest add chat-room

