import { useState, useEffect } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { getClientById, deleteClient } from '@/lib/supabase/clients'
import { Client } from '@/types'
import { toast } from 'sonner'
import { DeleteClientDialogProps } from '../types'

export function DeleteClientDialog({
  open,
  onOpenChange,
  clientId
}: DeleteClientDialogProps) {
  const [client, setClient] = useState<Client | null>(null)

  useEffect(() => {
    async function fetchClient() {
      if (clientId) {
        const foundClient = await getClientById(clientId)
        if (foundClient) {
          setClient(foundClient)
        }
      }
    }

    fetchClient()
  }, [clientId])

  const handleDelete = async () => {
    try {
      await deleteClient(clientId)
      toast.success('Client deleted successfully!')
      onOpenChange(false)
    } catch (error) {
      console.error('Error deleting client:', error)
      toast.error('Error deleting client')
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the client{' '}
            <strong>{client?.name}</strong>? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
