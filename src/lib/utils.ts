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

export function capitalize(str: string): string {
  if (!str || str.length === 0) return str
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}
