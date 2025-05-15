import { Client } from '@/types'

interface BaseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export interface ClientFormProps extends BaseDialogProps {
  mode: 'add' | 'edit'
  client?: Client
}

export interface DeleteClientDialogProps extends BaseDialogProps {
  clientId: string
}

export interface ViewClientDialogProps extends BaseDialogProps {
  client?: Client
}
