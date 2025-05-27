import { type VariantProps } from 'class-variance-authority'
import { type messageBubbleVariants } from './message-bubble'
import { type MessageStatus } from '../message-status/types'


export interface MessageBubbleProps extends VariantProps<typeof messageBubbleVariants> {
  /** The message content to display */
  message: string
  /** The timestamp of the message */
  timestamp: Date
  /** Whether this message was sent by the current user */
  isOwnMessage?: boolean
  /** The delivery status of the message (only shown for own messages) */
  status?: MessageStatus
  /** Additional CSS classes to apply */
  className?: string
} 
