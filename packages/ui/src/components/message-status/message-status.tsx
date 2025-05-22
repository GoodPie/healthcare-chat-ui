import * as React from 'react'
import { type MessageStatus as MessageStatusType } from './types'

const statusIcons: Record<string, string>  = {
  sent: '✓',
  delivered: '✓✓',
  read: '✓✓',
}

export function MessageStatus({ status }: { status: MessageStatusType }) {
  return (
    <span className="text-xs" title={status}>
      {statusIcons[status]}
    </span>
  )
} 
