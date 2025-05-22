import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { colors } from '@healthcare-chat-ui/design-tokens/colors'
import { typography } from '@healthcare-chat-ui/design-tokens/typography'

const messageBubbleVariants = cva(
  'rounded-lg p-4 max-w-[80%] relative',
  {
    variants: {
      variant: {
        default: 'bg-medical-blue-50 text-medical-blue-900',
        own: 'bg-medical-blue-500 text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface MessageBubbleProps {
  message: string
  timestamp: Date
  isOwnMessage?: boolean
  status?: 'sent' | 'delivered' | 'read'
  className?: string
}

export function MessageBubble({
  message,
  timestamp,
  isOwnMessage = false,
  status,
  className,
}: MessageBubbleProps) {
  return (
    <div className={cn('flex', isOwnMessage ? 'justify-end' : 'justify-start', className)}>
      <div className={cn(messageBubbleVariants({ variant: isOwnMessage ? 'own' : 'default' }))}>
        <p className={cn('text-sm', typography.fontSize.sm, typography.lineHeight.normal)}>{message}</p>
        <div className={cn('flex items-center gap-2 mt-2 text-xs opacity-70', typography.fontSize.xs)}>
          <span>{format(timestamp, 'HH:mm')}</span>
          {isOwnMessage && status && (
            <span className='status-indicator'>{status}</span>
          )}
        </div>
      </div>
    </div>
  )
} 