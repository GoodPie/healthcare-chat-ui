import type { Meta, StoryObj } from '@storybook/react';
import { MessageBubble } from '@healthcare-chat/ui';

const meta = {
  title: 'UI/MessageBubble',
  component: MessageBubble,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'text',
      description: 'The message content to display',
    },
    timestamp: {
      control: 'date',
      description: 'The timestamp of the message',
    },
    isOwnMessage: {
      control: 'boolean',
      description: 'Whether this message was sent by the current user',
    },
    status: {
      control: 'select',
      options: ['sending', 'sent', 'delivered', 'read', 'failed'],
      description: 'The delivery status of the message (only shown for own messages)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
    },
  },
} satisfies Meta<typeof MessageBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ReceivedMessage: Story = {
  args: {
    message: 'Hello! How are you feeling today?',
    timestamp: new Date(2023, 5, 15, 10, 30),
    isOwnMessage: false,
  },
};

export const SentMessage: Story = {
  args: {
    message: "I'm feeling much better, thank you for asking.",
    timestamp: new Date(2023, 5, 15, 10, 32),
    isOwnMessage: true,
    status: 'read',
  },
};

export const SendingMessage: Story = {
  args: {
    message: "I'm sending you a message right now.",
    timestamp: new Date(),
    isOwnMessage: true,
    status: 'sending',
  },
};

export const DeliveredMessage: Story = {
  args: {
    message: "When should I schedule my next appointment?",
    timestamp: new Date(2023, 5, 15, 10, 35),
    isOwnMessage: true,
    status: 'delivered',
  },
};

export const FailedMessage: Story = {
  args: {
    message: "This message failed to send.",
    timestamp: new Date(),
    isOwnMessage: true,
    status: 'failed',
  },
};
