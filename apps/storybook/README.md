# Healthcare Chat UI Storybook

This Storybook application allows you to view and interact with the UI components from the `@healthcare-chat/ui` package.

## Getting Started

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Start the Storybook development server:
   ```bash
   yarn storybook
   ```

3. Open your browser to the URL shown in the terminal (usually http://localhost:6006)

## Available Components

The following components are available in the Storybook:

- **MessageBubble**: Displays a chat message with optional status indicators
- **MessageStatus**: Displays the delivery status of a message

## Configuration

This Storybook application is configured to use:

- **Tailwind CSS 4**: For styling components
- **Design Tokens**: From the `@healthcare-chat/design-tokens` package
- **React 19**: For rendering components

## Using the CLI to Add Components

You can use the `@healthcare-chat/cli` to add components directly to your storybook project:

### How to Call the CLI

There are several ways to call the CLI from the storybook directory:

#### 1. Using Yarn Workspace Commands

Since this is a monorepo using Yarn workspaces, you can run the CLI using:

```bash
# From the repository root
yarn workspace @healthcare-chat/storybook healthcare-chat-ui add message-bubble

# Or if you're already in the storybook directory
cd apps/storybook
yarn healthcare-chat-ui add message-bubble
```

#### 2. Using npx

You can also use npx to run the CLI:

```bash
# From the storybook directory
cd apps/storybook
npx healthcare-chat-ui add message-bubble
```

#### 3. Using the Built CLI Directly

If you've built the CLI package, you can run it directly:

```bash
# From the storybook directory
cd apps/storybook
node ../../packages/cli/dist/index.js add message-bubble
```

### Where Components Are Created

When you run the CLI, it will:

1. Create a `src/components/ui` directory in your current working directory if it doesn't exist
2. Create a subdirectory for the component (e.g., `src/components/ui/message-bubble`)
3. Copy the component files into this directory

For example, running the CLI from the storybook directory will create:
- `apps/storybook/src/components/ui/message-bubble/message-bubble.tsx`
- `apps/storybook/src/components/ui/message-bubble/message-bubble.css`
- `apps/storybook/src/components/ui/message-bubble/types.ts`

### Using CLI-Added Components in Storybook

After adding a component with the CLI, you can create a story for it:

1. Create a new story file in `src/stories/`
2. Import the component from your local components directory:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from '../components/ui/my-component/my-component';

const meta = {
  title: 'UI/MyComponent',
  component: MyComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // Define the component's props
  },
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Define the default props
  },
};
```

## Adding Components from the UI Package

Alternatively, you can add components from the `@healthcare-chat/ui` package:

1. Create a new story file in the `src/stories` directory
2. Import the component from the `@healthcare-chat/ui` package
3. Define the component's props and examples

Example:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { YourComponent } from '@healthcare-chat/ui';

const meta = {
  title: 'UI/YourComponent',
  component: YourComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // Define the component's props
  },
} satisfies Meta<typeof YourComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Define the default props
  },
};
```
