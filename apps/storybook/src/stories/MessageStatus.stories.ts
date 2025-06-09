import type { Meta, StoryObj } from '@storybook/react';
import { MessageStatus } from '@healthcare-chat/ui';

const meta = {
  title: 'UI/MessageStatus',
  component: MessageStatus,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['sending', 'sent', 'delivered', 'read', 'failed'],
      description: 'The status of the message',
    },
  },
} satisfies Meta<typeof MessageStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sending: Story = {
  args: {
    status: 'sending',
  },
};

export const Sent: Story = {
  args: {
    status: 'sent',
  },
};

export const Delivered: Story = {
  args: {
    status: 'delivered',
  },
};

export const Read: Story = {
  args: {
    status: 'read',
  },
};

export const Failed: Story = {
  args: {
    status: 'failed',
  },
};
