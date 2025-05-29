import {format} from 'date-fns'
import {MessageStatus} from '../message-status/message-status'
import {cn} from '@sglara/cn'
import type {MessageBubbleProps} from './types'
import type {MessageStatus as MessageStatusType} from '../message-status/types'
import "./message-bubble.css";

export function MessageBubble({
                                message,
                                timestamp,
                                isOwnMessage = false,
                                status,
                                className,
                              }: MessageBubbleProps) {
  const formattedTime = format(timestamp, 'HH:mm');
  const messageType = isOwnMessage ? 'sent' : 'received';

  return (
    <div
      className={cn('flex', isOwnMessage ? 'justify-end' : 'justify-start', className)}
      role="listitem"
      aria-label={`${messageType} message at ${formattedTime}`}
    >
      <div
        className={`rounded-lg p-4 max-w-[80%] relative message-bubble ${isOwnMessage ? "own" : "default"}`}
        aria-live={isOwnMessage ? 'polite' : 'off'}
      >
        <p className="text-sm">{message}</p>
        <div className="flex items-center gap-2 mt-2 text-xs opacity-70">
          <time dateTime={timestamp.toISOString()} aria-label={`Sent at ${formattedTime}`}>
            {formattedTime}
          </time>
          {isOwnMessage && status && (
            <MessageStatus status={status as MessageStatusType}/>
          )}
        </div>
      </div>
    </div>
  )
}
