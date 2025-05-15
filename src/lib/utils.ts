import { clsx, type ClassValue } from 'clsx'
import { formatDistanceToNow } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (timestamp: number) => {
  try {
    return formatDistanceToNow(timestamp, {
      addSuffix: true
    })
  } catch {
    return String(timestamp)
  }
}
