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

## Adding New Components

To add a new component to the Storybook:

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
