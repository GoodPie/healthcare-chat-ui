import { type MessageStatus as MessageStatusType } from './types'
import { cn } from '@sglara/cn'

const statusIcons: Record<string, string> = {
  sending: '◌',
  sent: '✓',
  delivered: '✓✓',
  read: '✓✓',
  failed: '✗',
}

export function MessageStatus({ status }: { status: MessageStatusType }) {
  return (
    <span 
      className={cn(
        "text-xs", 
        `message-${status}`
      )} 
      title={status}
      aria-label={`Message ${status}`}
    >
      {statusIcons[status]}
    </span>
  )
} 
