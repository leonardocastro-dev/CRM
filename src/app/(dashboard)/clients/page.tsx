'use client'

import { ClientList } from './components/client-list'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { ClientForm } from './components/client-form'
import { useData } from '../store'

const ClientsPage = () => {
  const { user } = useAuth()
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const { clients } = useData()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Client Management
          </h1>
          <p className="text-muted-foreground">
            View and manage all your company&apos;s clients
          </p>
        </div>
        {user && (
          <Button onClick={() => setAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Client
          </Button>
        )}
      </div>

      <ClientList clients={clients} />

      {/* Add client dialog */}
      <ClientForm
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        mode="add"
      />
    </div>
  )
}

export default ClientsPage
