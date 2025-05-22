import * as React from 'react'
import {cva} from 'class-variance-authority'
import {format} from 'date-fns'
import {MessageStatus} from '../message-status/message-status'
import { cn } from '@sglara/cn'
import type { MessageBubbleProps } from './types'
import type { MessageStatus as MessageStatusType } from '../message-status/types'

export const messageBubbleVariants = cva(
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

export function MessageBubble({
                                message,
                                timestamp,
                                isOwnMessage = false,
                                status,
                                className,
                              }: MessageBubbleProps) {
  return (
    <div className={cn('flex', isOwnMessage ? 'justify-end' : 'justify-start', className)}>
      <div className={cn(messageBubbleVariants({variant: isOwnMessage ? 'own' : 'default'}))}>
        <p className="text-sm">{message}</p>
        <div className="flex items-center gap-2 mt-2 text-xs opacity-70">
          <span>{format(timestamp, 'HH:mm')}</span>
          {isOwnMessage && status && (
            <MessageStatus status={status as MessageStatusType}/>
          )}
        </div>
      </div>
    </div>
  )
} 
